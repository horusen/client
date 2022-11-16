import { IdentiteService } from "./../../identite/identite.service";
import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DomaineService } from "../../domaine/domaine.service";
import { NiveauService } from "../../niveau/niveau.service";
import { VilleService } from "../../villes/ville.service";
import { DiplomeService } from "../diplome.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-diplome-create",
  templateUrl: "./diplome-create.component.html",
  styleUrls: ["./diplome-create.component.scss"],
})
export class DiplomeCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  user: any;
  dependancies = {
    villes: [],
    domaines: [],
    niveaux: [],
  };

  dependanciesLoading = {
    villes: false,
    domaines: false,
    niveaux: false,
  };

  constructor(
    public diplomeService: DiplomeService,
    public villeService: VilleService,
    public domaineService: DomaineService,
    public niveauService: NiveauService,
    public identiteService: IdentiteService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(diplomeService);
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
      niveau: [null, Validators.required],
      libelle: [null, Validators.required],
      etablissement: [null, Validators.required],
      annee_obtention: [null, Validators.required],
    });
  }

  getDependancies(): void {
    this.getVilles();

    this.getDomaines();

    this.getNiveaux();
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

  getNiveaux(): void {
    this.dependanciesLoading.niveaux = true;
    this.niveauService.getAll(false).subscribe((niveaux) => {
      this.dependancies.niveaux = niveaux;
      this.dependanciesLoading.niveaux = false;
    });
  }

  create(): void {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        ...this.form.value,
        domaine: this.formValue("domaine")[0].id,
        niveau: this.formValue("niveau")[0].id,
        lieu: this.formValue("domaine")[0].id,
      };

      this.fillFormData(data);

      this.diplomeService.add(this.formData).subscribe(() => {
        this.loading = false;
        this.inititialiseForm();
        this.formData = new FormData();
        this.helper.hideModal("diplome-create-modal");
        this.router.navigate(["./"], { relativeTo: this.route });
      });
    } else {
      this.helper.alertDanger("Formulaire Invalide");
    }
  }
}
