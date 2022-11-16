import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { ComposantDescriptionService } from "../composant-description.service";

interface Configuration {
  path: string;
  fieldName: string;
  parentObject: any;
}

@Component({
  selector: "app-composant-description",
  templateUrl: "./composant-description.component.html",
  styleUrls: ["./composant-description.component.scss"],
})
export class ComposantDescriptionComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Input() configuration: Configuration;
  @Output() response = new EventEmitter<string>();
  form: FormGroup;
  constructor(public composantService: ComposantDescriptionService) {
    super(composantService);
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
    this.form = this.fb.group({
      [this.configuration.fieldName]: [
        this.configuration.parentObject.entite_diplomatique[
          this.configuration.fieldName
        ],
        Validators.required,
      ],
    });
  }

  patch(): void {
    if (this.form.value) {
      this.loading = true;
      const data = {
        ...this.configuration.parentObject.entite_diplomatique,
        ...this.form.value,
        pays_siege:
          this.configuration.parentObject.entite_diplomatique.pays_siege?.id,
        pays_origine:
          this.configuration.parentObject.entite_diplomatique.pays_origine?.id,
        ville: this.configuration.parentObject.addresse
          ? this.configuration.parentObject.addresse.ville.id_ville
          : null,
        addresse: this.configuration.parentObject.addresse
          ? this.configuration.parentObject.addresse.addresse
          : null,
      };
      this.composantService
        .patch(this.configuration.path, data)
        .subscribe((response) => {
          console.log("composant-description => ", response);

          this.response.emit(response);
          this.loading = false;
          this.initialiseForm();
        });
    }
  }
}
