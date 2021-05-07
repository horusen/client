import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseEditComponent } from "src/app/shared/components/base-component/base-edit.component";
import { DomaineService } from "../../domaine/domaine.service";
import { LangueService } from "../../langue/langue.service";
import { NiveauService } from "../../niveau/niveau.service";
import { ProgrammeService } from "../../programme.service";
import { TypeProgrammeService } from "../type-programme/type-programme.service";

@Component({
  selector: "app-programme-edit",
  templateUrl: "./programmed-edit.component.html",
  styleUrls: ["./programmed-edit.component.scss"],
})
export class ProgrammedEditComponent
  extends BaseEditComponent
  implements OnInit {
  dependancies = {
    domaine: [],
    type: [],
    langue: [],
    niveau: [],
  };

  dependanciesLoading = {
    type: false,
    domaine: false,
    langue: false,
    niveau: false,
  };

  constructor(
    public programmeService: ProgrammeService,
    public domaineService: DomaineService,
    public langueService: LangueService,
    public niveauService: NiveauService,
    public typeProgrammeService: TypeProgrammeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(programmeService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this._subscription["single"] = this.programmeService.singleData$.subscribe(
      (single) => {
        this.single = single;

        this.initFormWithData(
          single,
          [
            "type",
            "libelle",
            "description",
            "langue",
            "domaine",
            "niveau",
            "etablissement",
          ],
          ["id", "created_at", "updated_at", "deleted_at"],
          () => {
            this.formValuePatcher("etablissement", [single.etablissement]);
            this.formValuePatcher("domaine", [single.domaine]);
            this.formValuePatcher("niveau", [single.niveau]);
            this.formValuePatcher("langue", [single.langue]);
            this.formValuePatcher("type", [single.type]);

            this.isFormOk = true;
          }
        );
      }
    );

    this.getDependancies();
  }

  getDependancies() {
    this.getDomaine();
    this.getNiveau();
    this.getLangue();
    this.getTypeProgramme();
  }

  getTypeProgramme() {
    this.dependanciesLoading.type = true;
    this.typeProgrammeService.get(false).subscribe((data) => {
      this.dependancies.type = data;
      this.dependanciesLoading.type = false;
    });
  }

  getDomaine() {
    this.dependanciesLoading.domaine = true;
    this.domaineService.get(false).subscribe((domaines) => {
      this.dependancies.domaine = domaines;
      this.dependanciesLoading.domaine = false;
    });
  }

  getNiveau() {
    this.dependanciesLoading.niveau = true;
    this.niveauService.get(false).subscribe((niveaux) => {
      this.dependancies.niveau = niveaux;
      this.dependanciesLoading.niveau = false;
    });
  }

  getLangue() {
    this.dependanciesLoading.langue = true;
    this.langueService.get(false).subscribe((langues) => {
      this.dependancies.langue = langues;
      this.dependanciesLoading.langue = false;
    });
  }

  update() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        domaine: this.formValue("domaine")[0].id,
        niveau: this.formValue("niveau")[0].id,
        type: this.formValue("type")[0].id,
        langue: this.formValue("langue")[0].id,
        etablissement: this.formValue("etablissement")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, [
          "langue",
          "domaine",
          "type",
          "niveau",
          "etablissement",
        ]),
      };

      this.programmeService.update(this.single.id, data).subscribe(() => {
        this.loading = false;
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.toastSuccess();
      });
    } else {
      this.formInvalidError();
    }
  }
}
