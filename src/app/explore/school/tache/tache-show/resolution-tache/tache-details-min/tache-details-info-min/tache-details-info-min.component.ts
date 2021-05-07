import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../../../../affectation-tache/affectation-tache.service";

@Component({
  selector: "app-tache-details-info-min",
  templateUrl: "./tache-details-info-min.component.html",
  styleUrls: ["./tache-details-info-min.component.scss"],
})
export class TacheDetailsInfoMinComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public affectationTacheService: AffectationTacheService,
    public route: ActivatedRoute
  ) {
    super(affectationTacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
