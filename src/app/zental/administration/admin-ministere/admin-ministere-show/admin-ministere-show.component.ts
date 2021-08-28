import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-ministere-show",
  templateUrl: "./admin-ministere-show.component.html",
  styleUrls: ["./admin-ministere-show.component.scss"],
})
export class AdminMinistereShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
