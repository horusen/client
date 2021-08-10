import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DomaineService } from "../../domaine.service";

@Component({
  selector: "app-domaine-employe",
  templateUrl: "./domaine-employe.component.html",
  styleUrls: ["./domaine-employe.component.scss"],
})
export class DomaineEmployeComponent
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
