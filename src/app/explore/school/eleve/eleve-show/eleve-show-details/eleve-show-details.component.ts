import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { EleveService } from "../../../eleve.service";

@Component({
  selector: "app-eleve-show-details",
  templateUrl: "./eleve-show-details.component.html",
  styleUrls: ["./eleve-show-details.component.scss"],
})
export class EleveShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(public eleveService: EleveService, public route: ActivatedRoute) {
    super(eleveService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
