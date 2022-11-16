import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { LiaisonService } from "../../liaison.service";

@Component({
  selector: "app-liaison-employes",
  templateUrl: "./liaison-employes.component.html",
  styleUrls: ["./liaison-employes.component.scss"],
})
export class LiaisonEmployesComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public liaisonService: LiaisonService) {
    super(liaisonService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
