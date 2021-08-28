import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { AmbassadeService } from "../../ambassade.service";

@Component({
  selector: "app-ambassade-details",
  templateUrl: "./ambassade-details.component.html",
  styleUrls: ["./ambassade-details.component.scss"],
})
export class AmbassadeDetailsComponent
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
    this.enableFetchDataFromURL = false;
    super.ngOnInit();
  }
}
