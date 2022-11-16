import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../../ministere.service";

@Component({
  selector: "app-ministere-details",
  templateUrl: "./ministere-details.component.html",
  styleUrls: ["./ministere-details.component.scss"],
})
export class MinistereDetailsComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public ministereService: MinistereService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ministereService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
