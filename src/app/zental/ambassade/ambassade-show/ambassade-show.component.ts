import { AmbassadeService } from "./../ambassade.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ambassade-show",
  templateUrl: "./ambassade-show.component.html",
  styleUrls: ["./ambassade-show.component.scss"],
})
export class AmbassadeShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute
  ) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
