import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "src/app/zental/toloba/discussion/discussion/discussion.service";
import { TolobaEntiteDiplomatiqueService } from "src/app/zental/toloba/toloba-entite-diplomatique/toloba-entite-diplomatique.service";
import { ReactionService } from "../../reaction/reaction.service";

@Component({
  selector: "app-reaction-entite-diplomatique-list",
  templateUrl: "./reaction-entite-diplomatique-list.component.html",
  styleUrls: ["./reaction-entite-diplomatique-list.component.scss"],
})
export class ReactionEntiteDiplomatiqueListComponent
  extends BaseComponent
  implements OnInit
{
  service: any;
  discussion: any;
  entiteDiplomatique: any;
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public tolobaService: TolobaEntiteDiplomatiqueService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["discussion"] =
      this.discussionService.singleData$.subscribe((discussion) => {
        this.discussion = discussion;
        this.getByDiscussion(discussion.id);
      });

    this._subscription["entiteDiplomatique"] =
      this.tolobaService.entite_diplomatique$.subscribe(
        (entitediplomatique) => (this.entiteDiplomatique = entitediplomatique)
      );
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
      reaction.institution?.type === this.entiteDiplomatique.name &&
      reaction.institution.institution.id === this.entiteDiplomatique.item.id
    );
  }
}
