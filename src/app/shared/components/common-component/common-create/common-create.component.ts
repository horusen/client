import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { BaseCreateComponent } from "../../base-component/base-create.component";
import { CommonService } from "../common.service";

@Component({
  selector: "app-common-create",
  templateUrl: "./common-create.component.html",
  styleUrls: ["./common-create.component.css"],
})
export class CommonCreateComponent
  extends BaseCreateComponent
  implements OnInit
{
  @Output() itemCreated = new EventEmitter<{ name: string; item: any }>();

  @Input() configuration = {
    endpoint: null,
    name: null,
    hasDescription: false,
    submitButtonClass: "",
    item: null,
  };

  @Input() extraFields: any;

  constructor(public commonService: CommonService) {
    super(commonService);
  }

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() {
    this.form = this.fb.group({
      libelle: [this.configuration?.item?.libelle, Validators.required],
    });

    if (this.extraFields && !this.extraFields[0]) {
      Object.keys(this.extraFields).forEach((key) => {
        this.form.addControl(key, new FormControl(this.extraFields[key]));
      });
    }

    if (this.configuration.hasDescription) {
      this.form.addControl(
        "description",
        new FormControl(this.configuration?.item?.description)
      );
    }
  }

  create() {
    this.loading = true;
    this.commonService
      .create(
        this.configuration.endpoint,
        this.helper.serializeObject(this.form.value)
      )
      .subscribe(
        (data) => {
          const output = { name: this.configuration.name, item: data };
          this.itemCreated.emit(output);
          this.loading = false;
          this.initialiseForm();
        },
        () => {},
        () => {}
      );
  }
}
