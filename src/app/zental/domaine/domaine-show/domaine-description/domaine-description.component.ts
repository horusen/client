import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DomaineInstitutionService } from "src/app/zental/domaine-institution/domaine-institution.service";

@Component({
  selector: "app-domaine-description",
  templateUrl: "./domaine-description.component.html",
  styleUrls: ["./domaine-description.component.scss"],
})
export class DomaineDescriptionComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public domaineService: DomaineInstitutionService,
    public route: ActivatedRoute
  ) {
    super(domaineService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
