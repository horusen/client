import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { DomaineService } from "../../domaine/domaine.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { UserService } from "../../user/user.service";
import { ProfesseurService } from "../professeur.service";

@Component({
  selector: "app-professeur-add",
  templateUrl: "./professeur-add.component.html",
  styleUrls: ["./professeur-add.component.scss"],
})
export class ProfesseurAddComponent
  extends BaseCreateComponent
  implements OnInit {
  domaines: any[] = [];
  profilesProfesseur: any[] = []; // liste des utilisateurs qui ne sont pas encore professeur dans un etablissement donnés
  loadingProfilesProfesseurs: boolean = false;
  domaineLoading: boolean = false;
  constructor(
    public professeurService: ProfesseurService,
    public domaineService: DomaineService,
    public userService: UserService,
    public etablissementService: EtablissementService
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initialiseForm();
    this.getDomaines();

    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getNonProfesseursOnEtablissement(etablissement.id);
      this.formValuePatcher("etablissement", etablissement);
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      professeur: [null, Validators.required],
      etablissement: [null, Validators.required],
      domaines: [null, Validators.required],
    });
  }

  getNonProfesseursOnEtablissement(etablissement: number) {
    this.loadingProfilesProfesseurs = true;
    this.userService
      .getNonProfesseurOnEtablissement(etablissement)
      .subscribe((users) => {
        this.profilesProfesseur = users;
        this.loadingProfilesProfesseurs = false;
      });
  }

  getDomaines() {
    this.domaineLoading = true;
    this.domaineService.get(false).subscribe((domaines) => {
      this.domaines = domaines;
      this.domaineLoading = false;
    });
  }

  add() {
    if (this.form.valid) {
      this.loading = true;
      let data = {
        etablissement: this.formValue("etablissement").id,
        professeur: this.formValue("professeur")[0].id_inscription,
        domaines: this.helper.idExtractor(this.formValue("domaines")),
      };

      this.professeurService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal("professeur-add-modal");
      });
    }
  }
}
