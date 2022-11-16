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
  departements: any = [];
  departementLoading = false;
  constructor(
    public serviceService: ServiceService,
    public departementService: DepartementService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(serviceService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDepartements();
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
    } else if (this.parent.name === "bureau") {
      this.getDepartementsByBureau(this.parent.item.id);
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

  getDepartementsByBureau(bureau: number): void {
    this.departementLoading = true;
    this.departementService
      .getByBureau(bureau, {}, false)
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
      [this.parent.name]: [this.parent.item.id, Validators.required],
      service_com: [false, Validators.required],
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = Object.assign({}, this.form.value, {
        departement: this.formValue("departement")[0].id,
      });

      this.serviceService
        .add({
          ...this.helper.serializeObject(data),
          service_com: this.formValue("service_com"),
        })
        .subscribe(() => {
          this.loading = false;
          this.initialiseForm();
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
