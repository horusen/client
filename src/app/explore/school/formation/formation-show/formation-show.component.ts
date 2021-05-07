import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { FormationService } from "../formation.service";

@Component({
  selector: "app-formation-show",
  templateUrl: "./formation-show.component.html",
  styleUrls: ["./formation-show.component.scss"],
})
export class FormationShowComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public formationService: FormationService,
    public route: ActivatedRoute
  ) {
    super(formationService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
