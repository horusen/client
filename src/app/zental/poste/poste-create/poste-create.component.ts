import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { DomaineService } from "../../domaine/domaine.service";
import { MinistereService } from "../../ministere/ministere.service";
import { PosteService } from "../poste.service";

@Component({
  selector: "app-poste-create",
  templateUrl: "./poste-create.component.html",
  styleUrls: ["./poste-create.component.scss"],
})
export class PosteCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  domaines: any = [];
  domaineLoading = false;

  constructor(
    public posteService: PosteService,
    public domaineService: DomaineService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(posteService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.formValuePatcher("ministere", ministere.id);
          this.getDomainesByMinistere(ministere.id);
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.formValuePatcher("ambassade", ambassade.id);
          this.getDomainesByAmbassade(ambassade.id);
        });
    }
  }

  getDomainesByMinistere(ministere: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByMinistere(ministere, {}, false)
      .subscribe((domaines) => {
        this.domaines = domaines;
        this.domaineLoading = false;
      });
  }

  getDomainesByAmbassade(ambassade: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((domaines) => {
        this.domaines = domaines;
        this.domaineLoading = false;
      });
  }

  initialiseForm(service?: any): void {
    this.form = this.fb.group({
      libelle: [service?.libelle, Validators.required],
      domaine: [service ? [service.domaine] : [], Validators.required],
      description: [service?.description],
    });

    if (this.router.url.includes("ministere")) {
      this.addControl("ministere", service?.ministere, true);
    } else if (this.router.url.includes("ambassade")) {
      this.addControl("ambassade", service?.ambassade, true);
    }
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign(this.form.value, {
        domaine: this.formValue("domaine")[0].id,
      });

      this.posteService.add(data).subscribe(() => {
        this.loading = false;
        this.form.reset();
        this.router.navigate(["./"], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
        this.helper.toggleModal("poste-create-modal");
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
