import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ConsulatService } from "src/app/zental/consulat/consulat.service";

@Component({
  selector: "app-diplomatie-consulat-show",
  templateUrl: "./diplomatie-consulat-show.component.html",
  styleUrls: ["./diplomatie-consulat-show.component.scss"],
})
export class DiplomatieConsulatShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute
  ) {
    super(consulatService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
