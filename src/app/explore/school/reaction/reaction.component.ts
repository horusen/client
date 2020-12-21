import { Component, Input, OnInit } from "@angular/core";
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
  discussion: any;

  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    if (this.type == "discussion") {
      this._subscription[
        "discussion"
      ] = this.discussionService.singleData$.subscribe(
        (discussion) => (this.discussion = discussion)
      );
    }
  }
}
