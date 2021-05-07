import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ParentEleveService } from "../../parent-eleve.service";

@Component({
  selector: "app-parent-eleve-show-details",
  templateUrl: "./parent-eleve-show-details.component.html",
  styleUrls: ["./parent-eleve-show-details.component.scss"],
})
export class ParentEleveShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public parentService: ParentEleveService,
    public route: ActivatedRoute
  ) {
    super(parentService, route);
  }

  ngOnInit(): void {
    this.enableSubscribeToLoading = true;
    super.ngOnInit();
  }
}
