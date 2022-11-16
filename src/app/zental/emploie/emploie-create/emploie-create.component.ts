import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DomaineService } from "../../domaine/domaine.service";
import { IdentiteService } from "../../identite/identite.service";
import { TypeContactService } from "../../type-contact/type-contact.service";
import { VilleService } from "../../villes/ville.service";
import { EmploieService } from "../emploie.service";
import { TypeContratService } from "../../type-contrat/type-contrat.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-emploie-create",
  templateUrl: "./emploie-create.component.html",
  styleUrls: ["./emploie-create.component.scss"],
})
export class EmploieCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  user: any;
  dependancies = {
    villes: [],
    domaines: [],
    typeContrats: [],
  };

  dependanciesLoading = {
    villes: false,
    domaines: false,
    typeContrats: false,
  };

  constructor(
    public emploieService: EmploieService,
    public villeService: VilleService,
    public domaineService: DomaineService,
    public typeContratService: TypeContratService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(emploieService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
        this.inititialiseForm();
      }
    );

    this.getDependancies();
  }

  inititialiseForm(): void {
    this.form = this.fb.group({
      user: [this.user.id_inscription, Validators.required],
      domaine: [null, Validators.required],
      lieu: [null, Validators.required],
      description: [null, Validators.required],
      type_contrat: [null, Validators.required],
      libelle: [null, Validators.required],
      etablissement: [null, Validators.required],
      debut: [null, Validators.required],
      fin: [null],
    });
  }

  getDependancies(): void {
    this.getVilles();

    this.getDomaines();

    this.getTypesContrats();
  }

  getVilles(): void {
    this.dependanciesLoading.villes = true;
    this.villeService.getAll(false).subscribe((villes) => {
      this.dependancies.villes = villes;
      this.dependanciesLoading.villes = false;
    });
  }

  getDomaines(): void {
    this.dependanciesLoading.domaines = true;
    this.domaineService.getAll(false).subscribe((domaines) => {
      this.dependancies.domaines = domaines;
      this.dependanciesLoading.domaines = false;
    });
  }

  getTypesContrats(): void {
    this.dependanciesLoading.typeContrats = true;
    this.typeContratService.getAll(false).subscribe((typeContrats) => {
      this.dependancies.typeContrats = typeContrats;
      this.dependanciesLoading.typeContrats = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.helper.serializeObject(this.form.value),
        domaine: this.formValue("domaine")[0].id,
        type_contrat: this.formValue("type_contrat")[0].id,
        lieu: this.formValue("domaine")[0].id,
      };

      this.fillFormData(data);

      this.emploieService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.inititialiseForm();
        this.formData = new FormData();
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.hideModal("emploie-create-modal");
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
