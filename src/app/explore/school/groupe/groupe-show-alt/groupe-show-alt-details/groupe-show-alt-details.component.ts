import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { GroupeService } from "../../groupe.service";

@Component({
  selector: "app-groupe-show-alt-details",
  templateUrl: "./groupe-show-alt-details.component.html",
  styleUrls: ["./groupe-show-alt-details.component.scss"],
})
export class GroupeShowAltDetailsComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute
  ) {
    super(groupeService, route);
  }

  ngOnInit(): void {
    this.enableSubscribeToLoading = true;
    super.ngOnInit();
  }
}
