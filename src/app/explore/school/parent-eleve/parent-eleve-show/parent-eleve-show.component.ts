import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ParentEleveService } from "../parent-eleve.service";

@Component({
  selector: "app-parent-eleve-show",
  templateUrl: "./parent-eleve-show.component.html",
  styleUrls: ["./parent-eleve-show.component.scss"],
})
export class ParentEleveShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public parentService: ParentEleveService,
    public route: ActivatedRoute
  ) {
    super(parentService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    this.enableEmitLoading = true;
    super.ngOnInit();
  }
}
