import { MinistereService } from "src/app/zental/ministere/ministere.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";

@Component({
  selector: "app-ministere-passerelle",
  templateUrl: "./ministere-passerelle.component.html",
  styleUrls: ["./ministere-passerelle.component.scss"],
})
export class MinisterePasserelleComponent
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
