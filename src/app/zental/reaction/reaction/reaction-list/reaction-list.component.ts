import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { DiscussionService } from "../../../toloba/discussion/discussion/discussion.service";
import { ReactionService } from "../reaction.service";

@Component({
  selector: "app-reaction-list",
  templateUrl: "./reaction-list.component.html",
  styleUrls: ["./reaction-list.component.scss"],
})
export class ReactionListComponent extends BaseComponent implements OnInit {
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public imageHandlerService: ImageHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["discussion"] =
      this.discussionService.singleData$.subscribe((discussion) => {
        this.getByDiscussion(discussion.id);
      });
  }

  rebondir(reaction: any): void {
    this.reactionService.rebondissement = reaction;
  }

  supprimer(reaction: number): void {
    this.helper.alertConfirmation(() => {
      this.reactionService.delete(reaction).subscribe({
        next: () => {
          this.helper.toastSuccess();
        },
      });
    });
  }

  getByDiscussion(discussion: number): void {
    this.loading = true;
    this.reactionService.getByDiscussion(discussion).subscribe(() => {
      this.loading = false;
    });
  }

  isDialoguant(reaction: any): boolean {
    return (
      !reaction.service &&
      reaction.user.id_inscription === this.auth.user.id_inscription
    );
  }
}
