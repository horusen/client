import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { FormationService } from "../../formation.service";

@Component({
  selector: "app-formation-show-details",
  templateUrl: "./formation-show-details.component.html",
  styleUrls: ["./formation-show-details.component.scss"],
})
export class FormationShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public formationService: FormationService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(formationService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;
    super.ngOnInit();
  }
}
