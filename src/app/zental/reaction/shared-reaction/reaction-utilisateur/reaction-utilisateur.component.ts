import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ReactionService } from "../../reaction/reaction.service";

@Component({
  selector: "app-reaction-utilisateur",
  templateUrl: "./reaction-utilisateur.component.html",
  styleUrls: ["./reaction-utilisateur.component.scss"],
})
export class ReactionUtilisateurComponent
  extends BaseComponent
  implements OnInit
{
  @Input() reaction: any;
  @Input() reversed: boolean;
  constructor(
    public reactionService: ReactionService,
    public imageHandlerService: ImageHandlerService
  ) {
    super();
  }

  ngOnInit(): void {}

  rebondir(): void {
    this.reactionService.rebondissement = this.reaction;
  }

  supprimer(): void {
    this.helper.alertConfirmation(() => {
      this.reactionService.delete(this.reaction.id).subscribe({
        next: () => {
          this.helper.toastSuccess();
        },
      });
    });
  }
}
