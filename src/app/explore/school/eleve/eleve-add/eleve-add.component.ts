import { Component, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ClasseService } from "../../classe/classe.service";
import { EleveService } from "../../eleve.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { UserService } from "../../user/user.service";

@Component({
  selector: "app-eleve-add",
  templateUrl: "./eleve-add.component.html",
  styleUrls: ["./eleve-add.component.scss"],
})
export class EleveAddComponent extends BaseCreateComponent implements OnInit {
  classe: any;
  dependancies = {
    users: [],
    classes: [],
  };

  dependanciesLoading = {
    users: false,
    classes: false,
  };

  constructor(
    public eleveService: EleveService,
    public userService: UserService,
    public classeService: ClasseService,
    public etablissementService: EtablissementService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this.initForm();
    this.getDependancies();
  }

  getDependancies() {
    if (this.classeService.singleData) {
      this._subscription["classe"] = this.classeService.singleData$.subscribe(
        (classe) => {
          this.formValuePatcher("classe", [classe]);
          this.disableClasseField();
        }
      );
    } else {
      this._subscription[
        "etablissement"
      ] = this.etablissementService.singleData$.subscribe((etablissement) => {
        this.getClasseByEtablissement(etablissement.id);
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      classe: [null, Validators.required],
      eleves: [null, Validators.required],
    });

    this.form.controls.classe.valueChanges.subscribe((classe) => {
      this.getNotInClasse(classe[0].id);
      this.formValuePatcher("eleves", null);
    });

    this.isFormOk = true;
  }

  disableClasseField() {
    this.dropdownSettingsAlt.single = {
      singleSelection: true,
      labelKey: "libelle",
      enableSearchFilter: true,
      disabled: true,
    };
  }

  getClasseByEtablissement(etablissement: number) {
    this.dependanciesLoading.classes = true;
    this.classeService
      .getByEtablissement(etablissement, false)
      .subscribe((classes) => {
        this.dependancies.classes = classes;
        this.dependanciesLoading.classes = false;
      });
  }

  getNotInClasse(classe: number) {
    this.dependanciesLoading.users = true;
    this.userService.getByNotInClasse(classe).subscribe((data) => {
      this.dependancies.users = data;
      this.dependanciesLoading.users = false;
    });
  }

  resetForm() {
    if (this.classeService.singleData) {
      this.formValuePatcher("eleves", null);
    } else {
      this.form.reset();
    }
  }

  create() {
    if (this.form.valid) {
      this.loading = true;
      const data = {
        eleves: this.helper.idExtractor(
          this.formValue("eleves"),
          "id_inscription"
        ),
        classe: this.formValue("classe")[0].id,
      };
      this.eleveService.add(data).subscribe(() => {
        this.loading = false;
        this.resetForm();
        this.helper.toggleModal("eleve-add-modal");
      });
    }
  }
}
