import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../../../discussion/discussion.service";
import { EtablissementService } from "../../../etablissement/etablissement.service";

@Component({
  selector: "app-asset-discussion-etablissement",
  templateUrl: "./asset-discussion-etablissement.component.html",
  styleUrls: ["./asset-discussion-etablissement.component.scss"],
})
export class AssetDiscussionEtablissementComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public etablissementService: EtablissementService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this._subscription[
        "discussion"
      ] = this.discussionService.singleData$.subscribe((discussion) => {
        this.getData(discussion.correspondant.id_inscription, params);
      });
    });
  }

  getData(user: number, params?: Params) {
    this.loading = true;
    this.etablissementService.getByUser(user, params).subscribe(() => {
      this.loading = false;
    });
  }
}
