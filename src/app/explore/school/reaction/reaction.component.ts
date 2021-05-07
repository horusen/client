import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../discussion/discussion.service";
import { ReactionService } from "./reaction.service";

@Component({
  selector: "app-reaction",
  templateUrl: "./reaction.component.html",
  styleUrls: ["./reaction.component.scss"],
})
export class ReactionComponent extends BaseComponent implements OnInit {
  @Input() type: string;
  @Input() parentID: number;
  displayAssets: boolean = true;
  typeDiscussion: string;

  discussion: any;

  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.typeDiscussion = queryParams["type_discussion"];

      // Subscibe to discussion
      if (this.type == "discussion") {
        this._subscription[
          "discussion"
        ] = this.discussionService.singleData$.subscribe((discussion) => {
          this.discussion = discussion;
        });
      }
    });
  }
}
