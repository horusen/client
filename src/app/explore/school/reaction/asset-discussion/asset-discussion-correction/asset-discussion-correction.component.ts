import { BaseCreateComponent } from "src/app/shared/components/base-component/base-create.component";
import { Component, OnInit } from "@angular/core";
import { CorrectionTacheService } from "../../../tache/correction-tache/correction-tache.service";
import { DiscussionService } from "../../../discussion/discussion.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-asset-discussion-correction",
  templateUrl: "./asset-discussion-correction.component.html",
  styleUrls: ["./asset-discussion-correction.component.scss"],
})
export class AssetDiscussionCorrectionComponent
  extends BaseCreateComponent
  implements OnInit {
  constructor(
    public correctionService: CorrectionTacheService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(correctionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this._subscription[
        "discussion"
      ] = this.discussionService.singleData$.subscribe((discussion) => {
        this.getData(discussion.correspondant.id_inscription);
      });
    });
  }

  getData(user: number, params?: Params) {
    this.loading = true;
    this.correctionService.getByCreator(user, params).subscribe(() => {
      this.loading = false;
    });
  }
}
