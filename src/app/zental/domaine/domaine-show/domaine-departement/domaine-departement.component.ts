import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DomaineService } from "../../domaine.service";

@Component({
  selector: "app-domaine-departement",
  templateUrl: "./domaine-departement.component.html",
  styleUrls: ["./domaine-departement.component.scss"],
})
export class DomaineDepartementComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public domaineService: DomaineService) {
    super(domaineService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
