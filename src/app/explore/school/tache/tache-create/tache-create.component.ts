import { SousDomaineService } from "./../../sous-domaine/sous-domaine.service";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { TacheService } from "../tache.service";
import { NiveauService } from "../../niveau/niveau.service";
import { NiveauDifficulteService } from "../../niveau-difficulte/niveau-difficulte.service";
import { MotCleService } from "../../mot-cle/mot-cle.service";
import { LangueService } from "../../langue/langue.service";
import { BaseService } from "src/app/shared/services/base.service";

@Component({
  selector: "app-tache-create",
  templateUrl: "./tache-create.component.html",
  styleUrls: ["./tache-create.component.scss"],
})
export class TacheCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  constructor(
    public tacheService: TacheService,
    public sousDomaineService: SousDomaineService,
    public niveauService: NiveauService,
    public niveauDifficulteService: NiveauDifficulteService,
    public motCleService: MotCleService,
    public langueService: LangueService
  ) {
    super(tacheService);
  }
  dependancies = {
    sous_domaine: [],
    niveau: [],
    niveau_difficulte: [],
    langue: [],
    mot_cle: [],
  };

  dependanciesLoading = {
    sous_domaine: false,
    niveau: false,
    niveau_difficulte: false,
    langue: false,
    mot_cle: false,
  };

  onMotCleCreate(mot_cle: any) {
    this.motCleService.unshiftItemInData(mot_cle.item);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["schema"] = this.tacheService.schema$.subscribe(() => {
      this.initialiseForm();
    });

    this.getDependancies();
  }

  initialiseForm() {
    this.initForm(
      [
        "libelle",
        "sous_domaine",
        "description",
        "langue",
        "niveau",
        "niveau_difficulte",
      ],
      [],
      () => {
        // Ajout des autres champs
        this.addControl("mot_cles", null, false);

        this.valuePatcher("confidentialite", 1);
      }
    );
  }

  getDependancies() {
    this._getDependancie("sous_domaine", this.sousDomaineService);
    this._getDependancie("niveau", this.niveauService);
    this._getDependancie("niveau_difficulte", this.niveauDifficulteService);
    this._getDependancie("langue", this.langueService);
    this._getDependancie("mot_cle", this.motCleService);
  }

  private _getDependancie(dependancie: string, service: BaseService) {
    this.dependanciesLoading[dependancie] = true;
    service.get().subscribe((data) => {
      this.dependancies[dependancie] = data;
      this.dependanciesLoading[dependancie] = false;
    });
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        mot_cles: this.helper.idExtractor(this.formControl("mot_cles").value),
        sous_domaine: this.formControl("sous_domaine").value[0].id,
        niveau: this.formControl("niveau").value[0].id,
        langue: this.formControl("langue").value[0].id,
        niveau_difficulte: this.formControl("niveau_difficulte").value[0].id,
        ...this.helper.omitFieldInObject(this.form.value, [
          "mot_cles",
          "sous_domaine",
          "niveau",
          "langue",
          "niveau_difficulte",
        ]),
      };

      this.tacheService.add(data).subscribe(() => {
        this.initialiseForm();
        this.loading = false;
        this.helper.toggleModal("tache-create-modal");
        this.helper.alertSuccess();
      });
    }
  }
}
