import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-bureau-citoyen",
  templateUrl: "./bureau-citoyen.component.html",
  styleUrls: ["./bureau-citoyen.component.scss"],
})
export class BureauCitoyenComponent
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
