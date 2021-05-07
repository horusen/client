import { Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProgrammeService } from "../../programme.service";
import { FormationService } from "../formation.service";

@Component({
  selector: "app-formation-create",
  templateUrl: "./formation-create.component.html",
  styleUrls: ["./formation-create.component.scss"],
})
export class FormationCreateComponent
  extends BaseCreateComponent
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
    this.enableRetrieveSchema = false;

    this.getDependancies();
  }

  initialiseForm() {
    this.form = this.fb.group({
      libelle: [null, Validators.required],
      programme: [null, Validators.required],
      description: [null, Validators.required],
      programme_semaine: [null, Validators.required],
      organisation_cours: [null, Validators.required],
      temporalite_cours: [null, Validators.required],
      objectifs: [],
      code: [],
      condition_participation: [],
    });

    this.isFormOk = true;
  }

  getDependancies() {
    this.initialiseForm();

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

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        programme: this.formValue("programme")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, ["programme"]),
      };

      this.formationService.add(data).subscribe(() => {
        this.loading = false;
        this.initialiseForm();
        this.helper.toggleModal("formation-create-modal");
        this.helper.alertSuccess();
      });
    } else {
      this.formInvalidError();
    }
  }
}
