import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-bureau-fonction",
  templateUrl: "./bureau-fonction.component.html",
  styleUrls: ["./bureau-fonction.component.scss"],
})
export class BureauFonctionComponent
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
