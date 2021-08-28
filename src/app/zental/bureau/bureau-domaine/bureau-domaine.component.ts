import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-bureau-domaine",
  templateUrl: "./bureau-domaine.component.html",
  styleUrls: ["./bureau-domaine.component.scss"],
})
export class BureauDomaineComponent
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
