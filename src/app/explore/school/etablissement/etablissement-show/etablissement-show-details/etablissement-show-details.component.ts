import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { EtablissementService } from "../../etablissement.service";

@Component({
  selector: "app-etablissement-show-details",
  templateUrl: "./etablissement-show-details.component.html",
  styleUrls: ["./etablissement-show-details.component.scss"],
})
export class EtablissementShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
