import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../../../discussion/discussion.service";
import { TacheService } from "../../../tache/tache.service";

@Component({
  selector: "app-asset-discussion-tache",
  templateUrl: "./asset-discussion-tache.component.html",
  styleUrls: ["./asset-discussion-tache.component.scss"],
})
export class AssetDiscussionTacheComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public tacheService: TacheService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(tacheService);
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
    this.tacheService.getByCreation(user, params).subscribe(() => {
      this.loading = false;
    });
  }
}
