import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { TacheService } from "../../tache.service";

@Component({
  selector: "app-tache-details-info",
  templateUrl: "./tache-details-info.component.html",
  styleUrls: ["./tache-details-info.component.scss"],
})
export class TacheDetailsInfoComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(public tacheService: TacheService, public route: ActivatedRoute) {
    super(tacheService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
