import { DomaineService } from "./../../domaine.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-domaine-description",
  templateUrl: "./domaine-description.component.html",
  styleUrls: ["./domaine-description.component.scss"],
})
export class DomaineDescriptionComponent
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
