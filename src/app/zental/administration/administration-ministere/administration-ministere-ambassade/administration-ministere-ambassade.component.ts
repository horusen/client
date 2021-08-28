import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MinistereService } from "src/app/zental/ministere/ministere.service";

@Component({
  selector: "app-administration-ministere-ambassade",
  templateUrl: "./administration-ministere-ambassade.component.html",
  styleUrls: ["./administration-ministere-ambassade.component.scss"],
})
export class AdministrationMinistereAmbassadeComponent
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
