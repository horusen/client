import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { BureauService } from "src/app/zental/bureau/bureau.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-bureau-details",
  templateUrl: "./bureau-details.component.html",
  styleUrls: ["./bureau-details.component.scss"],
})
export class BureauDetailsComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public bureauxService: BureauService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(bureauxService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
