import { ActivatedRoute } from "@angular/router";
import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-administration-ministere-consulat",
  templateUrl: "./administration-ministere-consulat.component.html",
  styleUrls: ["./administration-ministere-consulat.component.scss"],
})
export class AdministrationMinistereConsulatComponent
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
    super.ngOnInit();
  }
}
