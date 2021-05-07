import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { EleveService } from "../../eleve.service";

@Component({
  selector: "app-eleve-show",
  templateUrl: "./eleve-show.component.html",
  styleUrls: ["./eleve-show.component.scss"],
})
export class EleveShowComponent extends BaseSingleComponent implements OnInit {
  constructor(public eleveService: EleveService, public route: ActivatedRoute) {
    super(eleveService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
