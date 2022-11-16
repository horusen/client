import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { LiaisonService } from "../../liaison.service";

@Component({
  selector: "app-liaison-description",
  templateUrl: "./liaison-description.component.html",
  styleUrls: ["./liaison-description.component.scss"],
})
export class LiaisonDescriptionComponent
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
