import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-ambassade-employe",
  templateUrl: "./ambassade-employe.component.html",
  styleUrls: ["./ambassade-employe.component.scss"],
})
export class AmbassadeEmployeComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute
  ) {
    super(ambassadeService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
