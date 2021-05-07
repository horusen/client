import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../../../discussion/discussion.service";
import { GroupeService } from "../../../groupe/groupe.service";

@Component({
  selector: "app-asset-discussion-groupe",
  templateUrl: "./asset-discussion-groupe.component.html",
  styleUrls: ["./asset-discussion-groupe.component.scss"],
})
export class AssetDiscussionGroupeComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public groupeService: GroupeService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this._subscription[
        "discussion"
      ] = this.discussionService.singleData$.subscribe((discussion) => {
        this.getData(discussion, params);
      });
    });
  }

  getData(discussion: any, params: Params) {
    this.loading = true;
    this.groupeService
      .getGroupesPartages(discussion.correspondant.id_inscription, params)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
