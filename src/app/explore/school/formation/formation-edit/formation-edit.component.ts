import { Component, OnInit } from "@angular/core";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProgrammeService } from "../../programme.service";
import { FormationService } from "../formation.service";

@Component({
  selector: "app-formation-edit",
  templateUrl: "./formation-edit.component.html",
  styleUrls: ["./formation-edit.component.scss"],
})
export class FormationEditComponent
  extends BaseEditComponent
  implements OnInit {
  dependancies = {
    programme_semaine: ["jour de semaine", "soir"],
    organisation_cours: ["individuel", "groupe"],
    temporalite_cours: ["matin", "midi", "après midi", "soir"],
    programme: [],
    etablissement: [],
  };

  dependanciesLoading = {
    programme: false,
    etablissement: false,
  };

  constructor(
    public formationService: FormationService,
    public etablissementService: EtablissementService,
    public programmeService: ProgrammeService
  ) {
    super(formationService);
  }

  ngOnInit(): void {
    this._subscription["single"] = this.formationService.singleData$.subscribe(
      (single) => {
        this.single = single;
        this.initFormWithData(
          single,
          [
            "libelle",
            "programme",
            "description",
            "programme_semaine",
            "organisation_cours",
            "temporalite_cours",
          ],
          ["id", "created_at", "updated_at", "deleted_at"],
          () => {
            this.formValuePatcher("programme", [single.programme]);
            this.isFormOk = true;
          }
        );
      }
    );

    this.getDependancies();
  }

  getDependancies() {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getProgramme(etablissement.id);
    });
  }

  getProgramme(etablissement: number) {
    this.dependanciesLoading.programme = true;
    this.programmeService
      .getByEtablissement(etablissement, false)
      .subscribe((programmes) => {
        this.dependancies.programme = programmes;
        this.dependanciesLoading.programme = false;
      });
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        programme: this.formValue("programme")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, ["programme"]),
      };

      this.formationService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal("formation-edit-modal");
        this.helper.alertSuccess();
      });
    } else {
      this.formInvalidError();
    }
  }
}
