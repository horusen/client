import { Component, OnInit } from "@angular/core";
import { ReactionListComponent } from "../../../reaction/reaction-list/reaction-list.component";
import { ReactionService } from "../../../reaction/reaction.service";
import { DiscussionService } from "../../discussion.service";

@Component({
  selector: "app-reaction-list-discussion-min",
  templateUrl: "./reaction-list-discussion-min.component.html",
  styleUrls: ["./reaction-list-discussion-min.component.scss"],
})
export class ReactionListDiscussionMinComponent
  extends ReactionListComponent
  implements OnInit {
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService
  ) {
    super(reactionService, discussionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
