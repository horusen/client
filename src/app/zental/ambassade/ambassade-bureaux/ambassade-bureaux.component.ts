import { ActivatedRoute } from "@angular/router";
import { AmbassadeService } from "src/app/zental/ambassade/ambassade.service";
import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ambassade-bureaux",
  templateUrl: "./ambassade-bureaux.component.html",
  styleUrls: ["./ambassade-bureaux.component.scss"],
})
export class AmbassadeBureauxComponent
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
