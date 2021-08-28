import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "src/app/zental/ambassade/ambassade.service";

@Component({
  selector: "app-admin-ambassade-show",
  templateUrl: "./admin-ambassade-show.component.html",
  styleUrls: ["./admin-ambassade-show.component.scss"],
})
export class AdminAmbassadeShowComponent
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
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
