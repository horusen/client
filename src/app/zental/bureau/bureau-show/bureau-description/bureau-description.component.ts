import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { BureauService } from "../../bureau.service";

@Component({
  selector: "app-bureau-description",
  templateUrl: "./bureau-description.component.html",
  styleUrls: ["./bureau-description.component.scss"],
})
export class BureauDescriptionComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public bureauService: BureauService) {
    super(bureauService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
