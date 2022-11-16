import { ConsulatService } from "./../../../consulat/consulat.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-consulat-show",
  templateUrl: "./admin-consulat-show.component.html",
  styleUrls: ["./admin-consulat-show.component.scss"],
})
export class AdminConsulatShowComponent
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
