import { BaseComponent } from "./base.component";

import { Component, OnInit } from "@angular/core";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { BaseService } from "../../services/base.service";
import { AppInjector } from "../../services/app-injector.service";

@Component({
  selector: "",
  template: "",
  styles: [],
})
export class BaseCreateComponent extends BaseComponent implements OnInit {
  /* PROPRIÉTÉS */
  protected isFormOk: boolean = false; // permet de savoir si le formulaire est pret à etre rendu dans la vues
  protected form: FormGroup; // Formulaire d'ajout
  protected formData: FormData = new FormData();
  protected schema: any; // Architechture de la table (depuis la base de données)
  public Editor = ClassicEditor; // Editor variable
  protected enableRetrieveSchema: boolean = true;
  protected subscription = {
    // Stocke toutes les souscriptions liés aux observables
    user: null,
    schema: null,
    etablissement: null,
  };

  protected configCalendrier = {
    // Configuration de ng2DatePicker
    day: {
      format: "YYYY-MM-DD",
      theme: "material",
    },
    year: {
      format: "YYYY",
      theme: "material",
      mode: "month",
    },
    hour: {
      format: "HH:MM",
      showTwentyFourHours: true,
      timeSeparator: ":",
    },
  };

  protected dropdownSettings = {
    multi: {
      singleSelection: false,
      idField: "id",
      textField: "libelle",
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    },

    single: {
      singleSelection: true,
      idField: "id",
      textField: "libelle",
      allowSearchFilter: true,
    },
  };

  protected dropdownSettingsAlt = {
    single: {
      singleSelection: true,
      labelKey: "libelle",
      enableSearchFilter: true,
    },
    multi: {
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      labelKey: "libelle",
      enableSearchFilter: true,
    },
    user: {
      text: this.helper.getTranslation("selctionnerLesMembres"),
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: true,
      allowSearchFilter: true,
    },
    users: {
      text: this.helper.getTranslation("selctionnerLesMembres"),
      enableSearchFilter: true,
      primaryKey: "id_inscription",
      singleSelection: false,
      selectAllText: "Tout selectionner",
      unSelectAllText: "Tout deselectionner",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    },
  };

  protected fb: FormBuilder;

  /* CONSTRUCTOR */
  constructor(protected service: BaseService) {
    super(service);
    this.fb = AppInjector.injector.get(FormBuilder);
  }

  /* ONINIT */
  ngOnInit() {
    if (this.enableRetrieveSchema) {
      // Get l'architecture de la table depuis la base de données
      this.service.describe().subscribe();
    }

    // initialisation du formulaire
    this.form = this.fb.group({});
  }

  /* METHODS */

  // Permet d'initialiser le formulaire à partir de l'architechture depuis la base de données
  // Le parametre data recoit le schema(architechture) de la table
  // Le parametre ignoredField recoit les champs à ignorer lors de l'initatialisation du formulaire
  // Le parametre requiredFiel recoit les champs qui sont required
  // Le paramete callback permet de renseigner des actions à faire aprés l'initalisation du formulaire
  initForm(
    schema: any,
    requiredField?: string[],
    ignoreField?: string[],
    callback?: Function
  ) {
    if (schema) {
      schema.forEach((element) => {
        let field = element.Field;
        if (!ignoreField.includes(field)) {
          if (requiredField.includes(field)) {
            this.form.addControl(
              field,
              new FormControl(null, Validators.required)
            );
          } else {
            this.form.addControl(field, new FormControl(null));
          }
        }
      });

      if (callback) {
        callback();
      }

      this.isFormOk = true;
    }
  }

  addBlurField(fields: string[]) {
    fields.forEach((field) => {
      this.form.addControl(
        field,
        new FormControl("", {
          validators: [Validators.required],
          updateOn: "blur",
        })
      );
    });
  }

  formValue(field: string) {
    return this.form.controls[field].value;
  }

  formControl(field: string) {
    return this.form.controls[field];
  }

  selectFormHandler(target: string, data: any) {
    this.form.controls[target].patchValue(data);
  }

  formValueComparer(
    minField: string,
    maxField: string,
    alertMessage: string,
    isDate: boolean = false
  ) {
    this.form.controls[minField].valueChanges.subscribe((value) => {
      if (isDate) {
        if (this.form.controls[maxField].value) {
          if (
            new Date(this.form.controls[minField].value) >
            new Date(this.form.controls[maxField].value)
          ) {
            this.helper.alertDanger(alertMessage);
            this.form.controls[maxField].setValue(null, {
              emitEvent: false,
            });
          }
        }
      } else {
        if (this.form.controls[maxField].value) {
          if (
            this.form.controls[minField].value >
            this.form.controls[maxField].value
          ) {
            this.helper.alertDanger(alertMessage);
            this.form.controls[maxField].setValue(null, {
              emitEvent: false,
            });
          }
        }
      }
    });
    this.form.controls[maxField].valueChanges.subscribe((value) => {
      // console.log(this.form.controls[minField].value > value)
      if (isDate) {
        if (
          new Date(this.form.controls[minField].value) >
          new Date(this.form.controls[maxField].value)
        ) {
          this.helper.alertDanger(alertMessage);
          this.form.controls[maxField].setValue(null, {
            emitEvent: false,
          });
        }
      } else {
        if (
          this.form.controls[minField].value >
          this.form.controls[maxField].value
        ) {
          this.helper.alertDanger(alertMessage);
          this.form.controls[maxField].setValue(null, {
            emitEvent: false,
          });
        }
      }
    });
  }

  addControls(names: string[], values: any[] = [], isRequired: boolean[] = []) {
    if (isRequired[0] && values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, values[counter], isRequired[counter]);
        counter++;
      });
    } else if (isRequired[0] && !values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, null, isRequired[counter]);
        counter++;
      });
    } else if (!isRequired[0] && values[0]) {
      let counter = 0;
      names.forEach((name) => {
        this.addControl(name, values[0]);
        counter++;
      });
    } else {
      names.forEach((name) => this.addControl(name));
    }
  }

  addControl(name: string, value: any = null, isRequired: boolean = false) {
    if (isRequired) {
      this.form.addControl(name, new FormControl(value, Validators.required));
    } else {
      this.form.addControl(name, new FormControl(value));
    }
  }

  valuePatcher(field: string, value: any) {
    // if (this.schema.hasOwnProperty(field)) {
    this.form.controls[field].patchValue(value);
    // } else {
    //   this.helper.toastDanger(`le champs ${field} n'existe pas dans la table`);
    // }
  }

  valuesPatcher(fields: string[], values: any[]) {
    let counter = 0;
    fields.forEach((field) => {
      this.valuePatcher(field, values[counter]);
      counter++;
    });
  }
}
