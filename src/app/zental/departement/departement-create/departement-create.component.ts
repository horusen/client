import { AmbassadeService } from "./../../ambassade/ambassade.service";
import { MinistereService } from "./../../ministere/ministere.service";
import { Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DepartementService } from "../departement.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsulatService } from "../../consulat/consulat.service";
import { DomaineInstitutionService } from "../../domaine-institution/domaine-institution.service";

@Component({
  selector: "app-departement-create",
  templateUrl: "./departement-create.component.html",
  styleUrls: ["./departement-create.component.scss"],
})
export class DepartementCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: { name: string; item: any };
  ministere: any;
  ambassade: any;
  consulat: any;
  domaines: any = [];
  domaineLoading = false;

  constructor(
    public departementService: DepartementService,
    public router: Router,
    public route: ActivatedRoute,
    public domaineService: DomaineInstitutionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService
  ) {
    super(departementService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    if (this.router.url.includes("ministere")) {
      this.ministereService.singleData$.subscribe((ministere) => {
        if (this.parent.name === "ministere")
          this.getDepartementsByMinistere(this.parent.item.id);
        this.formValuePatcher("ministere", ministere.id);
        this.ministere = ministere;
      });
    } else if (this.router.url.includes("ambassade")) {
      this.ambassadeService.singleData$.subscribe((ambassade) => {
        if (this.parent.name === "ambassade")
          this.getDepartementsByAmbassade(this.parent.item.id);
        this.formValuePatcher("ambassade", ambassade.id);
        this.ambassade = ambassade;
      });
    } else if (this.router.url.includes("consulat")) {
      this.consulatService.singleData$.subscribe((consulat) => {
        if (this.parent.name === "consulat")
          this.getDepartementsByConsulat(this.parent.item.id);
        this.formValuePatcher("consulat", consulat.id);
        this.consulat = consulat;
      });
    }
  }

  getDepartementsByMinistere(ministere: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByMinistere(ministere, {}, false)
      .subscribe((domaines) => {
        this.domaines = domaines;
        this.domaineLoading = false;
      });
  }

  getDepartementsByConsulat(consulat: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByConsulat(consulat, {}, false)
      .subscribe((domaines) => {
        this.domaines = domaines;
        this.domaineLoading = false;
      });
  }

  getDepartementsByAmbassade(ambassade: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((domaines) => {
        this.domaines = domaines;
        this.domaineLoading = false;
      });
  }

  initialiseForm(departement?: any): void {
    this.form = this.fb.group({
      libelle: [departement?.libelle, Validators.required],
      description: [departement?.description, Validators.required],
      domaine: [
        departement?.domaine ? [departement?.domaine] : [],
        Validators.required,
      ],
    });

    if (this.router.url.includes("ministere")) {
      this.addControl("ministere", departement?.ministere);
    } else if (this.router.url.includes("ambassade")) {
      this.addControl("ambassade", departement?.ambassade);
    } else if (this.router.url.includes("consulat")) {
      this.addControl("consulat", departement?.consulat);
    }

    if (this.parent.name === "domaine") {
      this.formValuePatcher("domaine", [this.parent.item]);
    }

    if (this.router.url.includes("ministere")) {
      this.formValuePatcher("ministere", this.ministere?.id);
    } else if (this.router.url.includes("ambassade")) {
      this.formValuePatcher("ambassade", this.ambassade?.id);
    } else if (this.router.url.includes("consulat")) {
      this.formValuePatcher("consulat", this.consulat?.id);
    }
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        domaine: this.formValue("domaine")[0].id,
      });

      this.departementService
        .add(this.helper.serializeObject(data))
        .subscribe(() => {
          this.loading = false;
          this.initialiseForm();
          this.ministere
            ? this.formValuePatcher("ministere", this.ministere.id)
            : null;
          this.ambassade
            ? this.formValuePatcher("ambassade", this.ambassade.id)
            : null;
          this.consulat
            ? this.formValuePatcher("consulat", this.consulat.id)
            : null;
          this.router.navigate(["./"], {
            relativeTo: this.route,
            queryParamsHandling: "preserve",
          });
          this.helper.toggleModal("departement-create-modal");
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
