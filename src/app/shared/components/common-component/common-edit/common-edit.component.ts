import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommonService } from "../common.service";
import { CommonCreateComponent } from "../common-create/common-create.component";

@Component({
  selector: "app-common-edit",
  templateUrl: "./common-edit.component.html",
  styleUrls: ["./common-edit.component.css"],
})
export class CommonEditComponent
  extends CommonCreateComponent
  implements OnInit
{
  @Output() itemEdited = new EventEmitter<{ name: string; item: any }>();

  constructor(public commonService: CommonService) {
    super(commonService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  edit() {
    this.loading = true;
    this.commonService
      .edit(
        `${this.configuration.endpoint}/${this.configuration.item?.id}`,
        this.helper.serializeObject(this.form.value)
      )
      .subscribe(
        (data) => {
          const output = { name: this.configuration.name, item: data };
          this.itemEdited.emit(output);
          this.loading = false;
        },
        () => {},
        () => {}
      );
  }
}
