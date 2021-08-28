import { BureauService } from "./../bureau.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-bureau-departement",
  templateUrl: "./bureau-departement.component.html",
  styleUrls: ["./bureau-departement.component.scss"],
})
export class BureauDepartementComponent
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
