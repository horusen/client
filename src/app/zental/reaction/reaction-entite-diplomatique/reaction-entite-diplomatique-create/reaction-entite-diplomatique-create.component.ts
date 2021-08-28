import { Component, OnInit } from "@angular/core";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { DiscussionService } from "src/app/zental/toloba/discussion/discussion/discussion.service";
import { TolobaEntiteDiplomatiqueService } from "src/app/zental/toloba/toloba-entite-diplomatique/toloba-entite-diplomatique.service";
import { ReactionCreateComponent } from "../../reaction/reaction-create/reaction-create.component";
import { ReactionService } from "../../reaction/reaction.service";

@Component({
  selector: "app-reaction-entite-diplomatique-create",
  templateUrl: "./reaction-entite-diplomatique-create.component.html",
  styleUrls: ["./reaction-entite-diplomatique-create.component.scss"],
})
export class ReactionEntiteDiplomatiqueCreateComponent
  extends ReactionCreateComponent
  implements OnInit
{
  entiteDiplomatique: {
    type: string;
    item: any;
  };
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public documentService: DocumentHandlerService,
    public enregistreurService: EnregistreurAudioService,
    public imageHandlerService: ImageHandlerService,
    public tolobaService: TolobaEntiteDiplomatiqueService
  ) {
    super(
      reactionService,
      discussionService,
      documentService,
      enregistreurService,
      imageHandlerService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this._subscription["service"] =
      this.tolobaService.entite_diplomatique$.subscribe(
        (entiteDiplomatique) => {
          this.entiteDiplomatique = entiteDiplomatique;

          if (this.form.contains(entiteDiplomatique.name))
            this.formValuePatcher(
              entiteDiplomatique.name,
              entiteDiplomatique.item.id
            );
          else
            this.addControl(
              entiteDiplomatique.name,
              entiteDiplomatique.item.id,
              true
            );
        }
      );
  }
}
