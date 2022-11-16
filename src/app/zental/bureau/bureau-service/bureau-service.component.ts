import { BureauService } from "./../bureau.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-bureau-service",
  templateUrl: "./bureau-service.component.html",
  styleUrls: ["./bureau-service.component.scss"],
})
export class BureauServiceComponent
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
