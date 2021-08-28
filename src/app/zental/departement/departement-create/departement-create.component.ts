import { Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DepartementService } from "../departement.service";
import { ActivatedRoute, Router } from "@angular/router";
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

  domaines: any = [];
  domaineLoading = false;

  constructor(
    public departementService: DepartementService,
    public router: Router,
    public route: ActivatedRoute,
    public domaineService: DomaineInstitutionService
  ) {
    super(departementService);
  }

  ngOnInit(): void {
    this.initialiseForm();

    this.getDomaines();
  }

  getDomaines(): void {
    if (this.parent.name === "ministere") {
      this.getDomainesByMinistere(this.parent.item.id);
    } else if (this.parent.name === "ambassade") {
      this.getDomainesByAmbassade(this.parent.item.id);
    } else if (this.parent.name === "consulat") {
      this.getDomainesByConsulat(this.parent.item.id);
    } else if (this.parent.name === "bureau") {
      this.getDomainesByBureau(this.parent.item.id);
    }
  }

  getDomainesByBureau(bureau: number): void {
    this.domaineLoading = true;
    this.domaineService.getByBureau(bureau, {}, false).subscribe((domaines) => {
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

  getDomainesByConsulat(consulat: number): void {
    this.domaineLoading = true;
    this.domaineService
      .getByConsulat(consulat, {}, false)
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

  initialiseForm(departement?: any): void {
    this.form = this.fb.group({
      libelle: [departement?.libelle, Validators.required],
      description: [departement?.description, Validators.required],
      domaine: [
        departement?.domaine ? [departement?.domaine] : [],
        Validators.required,
      ],
      [this.parent.name]: this.parent.item.id,
    });
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
