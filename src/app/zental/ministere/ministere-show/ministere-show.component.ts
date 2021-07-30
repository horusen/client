import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { MinistereService } from "../ministere.service";

@Component({
  selector: "app-ministere-show",
  templateUrl: "./ministere-show.component.html",
  styleUrls: ["./ministere-show.component.scss"],
})
export class MinistereShowComponent
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
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }
}
