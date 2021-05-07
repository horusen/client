import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-show-alt",
  templateUrl: "./groupe-show-alt.component.html",
  styleUrls: ["./groupe-show-alt.component.scss"],
})
export class GroupeShowAltComponent
  extends BaseSingleComponent
  implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public route: ActivatedRoute
  ) {
    super(groupeService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    this.enableEmitLoading = true;
    super.ngOnInit();
  }
}
