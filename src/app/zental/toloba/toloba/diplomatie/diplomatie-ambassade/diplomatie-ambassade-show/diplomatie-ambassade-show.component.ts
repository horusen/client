import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "src/app/zental/ambassade/ambassade.service";

@Component({
  selector: "app-diplomatie-ambassade-show",
  templateUrl: "./diplomatie-ambassade-show.component.html",
  styleUrls: ["./diplomatie-ambassade-show.component.scss"],
})
export class DiplomatieAmbassadeShowComponent
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
