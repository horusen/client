import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-bureau-employe",
  templateUrl: "./bureau-employe.component.html",
  styleUrls: ["./bureau-employe.component.scss"],
})
export class BureauEmployeComponent
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
