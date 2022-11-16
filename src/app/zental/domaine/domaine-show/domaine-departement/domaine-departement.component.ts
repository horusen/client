import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DomaineInstitutionService } from "src/app/zental/domaine-institution/domaine-institution.service";

@Component({
  selector: "app-domaine-departement",
  templateUrl: "./domaine-departement.component.html",
  styleUrls: ["./domaine-departement.component.scss"],
})
export class DomaineDepartementComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public domaineService: DomaineInstitutionService) {
    super(domaineService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
