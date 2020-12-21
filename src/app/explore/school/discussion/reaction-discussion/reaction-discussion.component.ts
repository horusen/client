import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-reaction-discussion",
  templateUrl: "./reaction-discussion.component.html",
  styleUrls: ["./reaction-discussion.component.scss"],
})
export class ReactionDiscussionComponent
  extends BaseComponent
  implements OnInit {
  discussion: any;
  afficherReaction = false;
  constructor(public discussionService: DiscussionService) {
    super(discussionService);
  }

  ngOnInit(): void {
    this._subscription[
      "discussion"
    ] = this.discussionService.singleData$.subscribe((discussion) => {
      this.discussion = discussion;
      this.reafficherReaction();
    });
  }

  reafficherReaction() {
    this.afficherReaction = false;
    setTimeout(() => {
      this.afficherReaction = true;
    }, 100);
  }
}
