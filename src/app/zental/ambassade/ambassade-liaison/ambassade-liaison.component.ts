import { ActivatedRoute } from "@angular/router";
import { AmbassadeService } from "src/app/zental/ambassade/ambassade.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-ambassade-liaison",
  templateUrl: "./ambassade-liaison.component.html",
  styleUrls: ["./ambassade-liaison.component.scss"],
})
export class AmbassadeLiaisonComponent
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
