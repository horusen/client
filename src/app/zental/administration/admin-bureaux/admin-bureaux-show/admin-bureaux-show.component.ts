import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BureauService } from "src/app/zental/bureau/bureau.service";

@Component({
  selector: "app-admin-bureaux-show",
  templateUrl: "./admin-bureaux-show.component.html",
  styleUrls: ["./admin-bureaux-show.component.scss"],
})
export class AdminBureauxShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public bureauxService: BureauService,
    public route: ActivatedRoute
  ) {
    super(bureauxService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
