import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EtablissementService } from "src/app/explore/school/etablissement/etablissement.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-administration-etablissement-show-details",
  templateUrl: "./administration-etablissement-show-details.component.html",
  styleUrls: ["./administration-etablissement-show-details.component.scss"],
})
export class AdministrationEtablissementShowDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public etablissementService: EtablissementService
  ) {
    super(etablissementService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;
    super.ngOnInit();
  }
}
