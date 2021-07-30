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
        this.configuration.parentObject[this.configuration.fieldName],
        Validators.required,
      ],
    });
  }

  patch(): void {
    this.loading = true;
    this.composantService
      .patch(
        this.configuration.path,
        Object.assign(this.configuration.parentObject, this.form.value)
      )
      .subscribe((data) => {
        this.response.emit(data);
        this.loading = false;
        this.initialiseForm();
      });
  }
}
