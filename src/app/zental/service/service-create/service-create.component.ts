import { Component, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { ConsulatService } from "../../consulat/consulat.service";
import { DepartementService } from "../../departement/departement.service";
import { MinistereService } from "../../ministere/ministere.service";
import { ServiceService } from "../service.service";

@Component({
  selector: "app-service-create",
  templateUrl: "./service-create.component.html",
  styleUrls: ["./service-create.component.scss"],
})
export class ServiceCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() parent: { name: string; item: any };
  ministere: any;
  ambassade: any;
  consulat: any;
  departements: any = [];
  departementLoading = false;
  constructor(
    public serviceService: ServiceService,
    public departementService: DepartementService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public consulatService: ConsulatService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDepartements();

    if (this.router.url.includes("ministere")) {
      this.ministereService.singleData$.subscribe((ministere) => {
        this.formValuePatcher("ministere", ministere.id);
        this.ministere = ministere;
      });
    } else if (this.router.url.includes("ambassade")) {
      this.ambassadeService.singleData$.subscribe((ambassade) => {
        this.formValuePatcher("ambassade", ambassade.id);
        this.ambassade = ambassade;
      });
    } else if (this.router.url.includes("consulat")) {
      this.consulatService.singleData$.subscribe((consulat) => {
        this.formValuePatcher("consulat", consulat.id);
        this.consulat = consulat;
      });
    }
  }

  getDepartements(): void {
    if (this.parent.name === "ministere") {
      this.getDepartementsByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this.getDepartementsByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this.getDepartementsByConsulat(this.parent.item.id);
    } else if (this.parent.name === "domaine") {
      this.getDepartementByDomaine(this.parent.item.id);
    }
  }

  getDepartementsByMinistere(ministere: number): void {
    this.departementLoading = true;
    this.departementService
      .getByMinistere(ministere, {}, false)
      .subscribe((departements) => {
        this.departements = departements;
        this.departementLoading = false;
      });
  }

  getDepartementsByConsulat(consulat: number): void {
    this.departementLoading = true;
    this.departementService
      .getByConsulat(consulat, {}, false)
      .subscribe((departements) => {
        this.departements = departements;
        this.departementLoading = false;
      });
  }

  getDepartementsByAmbassade(ambassade: number): void {
    this.departementLoading = true;
    this.departementService
      .getByAmbassade(ambassade, {}, false)
      .subscribe((departements) => {
        this.departements = departements;
        this.departementLoading = false;
      });
  }

  getDepartementByDomaine(domaine: number): void {
    this.departementLoading = true;
    this.departementService
      .getByDomaine(domaine, {}, false)
      .subscribe((departements) => {
        this.departements = departements;
        this.departementLoading = false;
      });
  }

  initialiseForm(service?: any): void {
    this.form = this.fb.group({
      libelle: [service?.libelle, Validators.required],
      departement: [service ? [service.departement] : [], Validators.required],
      description: [service?.description],
    });

    if (this.router.url.includes("ministere")) {
      this.addControl("ministere", service?.ministeres[0].id, true);
    } else if (this.router.url.includes("ambassade")) {
      this.addControl("ambassade", service?.ambassades[0].id, true);
    } else if (this.router.url.includes("consulat")) {
      this.addControl("consulat", service?.consulats[0].id, true);
    }

    if (this.parent.name === "departement") {
      this.formValuePatcher("departement", [this.parent.item]);
    }
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        departement: this.formValue("departement")[0].id,
      });

      this.serviceService
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
          this.helper.toggleModal("service-create-modal");
        });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
