import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";

import { DomaineService } from "../../domaine/domaine.service";
import { LangueService } from "../../langue/langue.service";
import { NiveauService } from "../../niveau/niveau.service";
import { ProgrammeService } from "../../programme.service";

import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { TypeProgrammeService } from "../type-programme/type-programme.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-programme-create",
  templateUrl: "./programme-create.component.html",
  styleUrls: ["./programme-create.component.scss"],
})
export class ProgrammeCreateComponent
  extends BaseCreateComponent
  implements OnInit {
  constructor(
    public programmeService: ProgrammeService,
    public domaineService: DomaineService,
    public langueService: LangueService,
    public niveauService: NiveauService,
    public etablissementService: EtablissementService,
    public typeProgrammeService: TypeProgrammeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(programmeService);
  }

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

  ngOnInit(): void {
    this.enableRetrieveSchema = false;
    super.ngOnInit();

    this.initialiseForm();

    this.getDependancies();

    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.formValuePatcher("etablissement", etablissement.id);
    });
  }

  initialiseForm() {
    this.form = this.fb.group({
      type: [null, Validators.required],
      libelle: [null, Validators.required],
      description: [null, Validators.required],
      langue: [null, Validators.required],
      domaine: [null, Validators.required],
      niveau: [null, Validators.required],
      etablissement: [null, Validators.required],
      code: [null],
      condition_admission: [null],
    });

    this.isFormOk = true;
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

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        domaine: this.formValue("domaine")[0].id,
        niveau: this.formValue("niveau")[0].id,
        type: this.formValue("type")[0].id,
        langue: this.formValue("langue")[0].id,
        ...this.helper.omitFieldInObject(this.form.value, [
          "langue",
          "domaine",
          "type",
          "niveau",
        ]),
      };

      this.programmeService.add(data).subscribe(() => {
        this.loading = false;
        this.helper.toggleModal("programme-create-modal");
        this.router.navigate(["./"], { relativeTo: this.route });
        this.helper.toastSuccess();
        this.initialiseForm();
      });
    } else {
      this.formInvalidError();
    }
  }
}
