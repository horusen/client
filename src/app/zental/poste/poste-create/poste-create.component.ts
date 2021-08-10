import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
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
  ministere: any;
  @Input() parent: { name: string; item: any };

  constructor(
    public posteService: PosteService,
    public domaineService: DomaineService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(posteService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDomaines();

    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.formValuePatcher("ministere", ministere.id);
          this.ministere = ministere;
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.formValuePatcher("ambassade", ambassade.id);
        });
    } else if (this.router.url.includes("consulat")) {
      this._subscription["consulat"] =
        this.consulatService.singleData$.subscribe((consulat) => {
          this.formValuePatcher("consulat", consulat.id);
        });
    }
  }

  getDomaines(): void {
    if (this.parent.name === "ministere") {
      this.getDomainesByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this.getDomainesByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this.getDomainesByConsulat(this.parent.item.id);
    }
  }

  getDomainesByConsulat(consulat: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByConsulat(consulat, {}, false)
      .subscribe((domaines) => {
        this.domaines = domaines;
        this.domaineLoading = false;
      });
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
    } else if (this.router.url.includes("consulat")) {
      this.addControl("consulat", service?.consulat, true);
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
        this.initialiseForm();
        this.formValuePatcher("ministere", this.ministere.id);
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
