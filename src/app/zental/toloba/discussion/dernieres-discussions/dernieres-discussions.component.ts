import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ReactionService } from "src/app/zental/reaction/reaction/reaction.service";
import { DiscussionService } from "../discussion/discussion.service";

@Component({
  selector: "app-dernieres-discussions",
  templateUrl: "./dernieres-discussions.component.html",
  styleUrls: ["./dernieres-discussions.component.scss"],
})
export class DernieresDiscussionsComponent
  extends BaseComponent
  implements OnInit
{
  @Input() dialoguant: { id: number; type: string };

  constructor(
    public discussionService: DiscussionService,
    public reactionService: ReactionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData();

    this._subscription["reaction"] =
      this.reactionService.lastItemcreated$.subscribe((reaction) => {
        // Resort discussion
        this.discussionService.sortData(reaction.discussion);

        // Update last reaction of the last discussion
        this.discussionService.updateItemInData(reaction.discussion, {
          ...this.discussionService.findItemInDataByID(reaction.discussion),
          last_reaction: reaction,
        });
      });
  }

  getData(): void {
    if (
      this.dialoguant?.type === "service" ||
      this.dialoguant?.type === "entite_diplomatique"
    ) {
      this.getByService(this.dialoguant.id);
    } else if (this.dialoguant?.type === "user") {
      this.getByUtilisateur(this.dialoguant.id);
    }
  }

  getByService(service: number): void {
    this.loading = true;
    this.discussionService.getDernieresDiscussionsService(service).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByUtilisateur(user: number): void {
    this.loading = true;
    this.discussionService.getDernieresDiscussionsUtilisateur(user).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }
}
