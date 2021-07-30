import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BureauService } from "../../bureau.service";

@Component({
  selector: "app-bureau-employes",
  templateUrl: "./bureau-employes.component.html",
  styleUrls: ["./bureau-employes.component.scss"],
})
export class BureauEmployesComponent
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
