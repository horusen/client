import { Component, OnInit } from "@angular/core";
import { DiplomatieService } from "src/app/zental/diplomatie/diplomatie.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-diplomatie-ambassade-list",
  templateUrl: "./diplomatie-ambassade-list.component.html",
  styleUrls: ["./diplomatie-ambassade-list.component.scss"],
})
export class DiplomatieAmbassadeListComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(public diplomatieService: DiplomatieService) {
    super(diplomatieService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
