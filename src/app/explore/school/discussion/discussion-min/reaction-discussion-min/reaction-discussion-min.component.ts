import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ReactionService } from "../../../reaction/reaction.service";
import { DiscussionService } from "../../discussion.service";

@Component({
  selector: "app-reaction-discussion-min",
  templateUrl: "./reaction-discussion-min.component.html",
  styleUrls: ["./reaction-discussion-min.component.scss"],
})
export class ReactionDiscussionMinComponent
  extends BaseComponent
  implements OnInit {
  discussion: any;
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public router: Router
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription[
      "discussion"
    ] = this.discussionService.singleData$.subscribe((discussion) => {
      this.discussion = discussion;
    });
  }
}
