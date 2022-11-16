import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DiplomatieService } from "src/app/zental/diplomatie/diplomatie.service";

@Component({
  selector: "app-diplomatie-consulat-list",
  templateUrl: "./diplomatie-consulat-list.component.html",
  styleUrls: ["./diplomatie-consulat-list.component.scss"],
})
export class DiplomatieConsulatListComponent
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
