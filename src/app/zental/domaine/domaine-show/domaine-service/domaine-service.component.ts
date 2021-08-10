import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DomaineService } from "../../domaine.service";

@Component({
  selector: "app-domaine-service",
  templateUrl: "./domaine-service.component.html",
  styleUrls: ["./domaine-service.component.scss"],
})
export class DomaineServiceComponent
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
