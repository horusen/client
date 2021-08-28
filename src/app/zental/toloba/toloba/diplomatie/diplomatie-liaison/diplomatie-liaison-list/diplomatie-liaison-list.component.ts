import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DiplomatieService } from "src/app/zental/diplomatie/diplomatie.service";

@Component({
  selector: "app-diplomatie-liaison-list",
  templateUrl: "./diplomatie-liaison-list.component.html",
  styleUrls: ["./diplomatie-liaison-list.component.scss"],
})
export class DiplomatieLiaisonListComponent
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
