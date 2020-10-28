import { Component, OnInit } from "@angular/core";
import { TacheService } from "src/app/explore/school/tache/tache.service";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ReactionModeMessengerCreateComponent } from "../../../reaction-mode-messenger/reaction-mode-messenger-create/reaction-mode-messenger-create.component";
import { ReactionResolutionTacheService } from "../../../resolution-tache/reaction-resolution-tache.service";

@Component({
  selector: "app-reaction-mode-commentaire-create",
  templateUrl: "./reaction-mode-commentaire-create.component.html",
  styleUrls: ["./reaction-mode-commentaire-create.component.scss"],
})
export class ReactionModeCommentaireCreateComponent extends ReactionModeMessengerCreateComponent {
  // constructor(
  //   public reactionService: ReactionResolutionTacheService,
  //   public tacheService: TacheService,
  //   public enregistreurService: EnregistreurAudioService,
  //   public imageHandlerService: ImageHandlerService,
  //   public documentService: DocumentHandlerService,
  // ) {
  //   super(
  //     reactionService,
  //     tacheService,
  //     enregistreurService,
  //     imageHandlerService,
  //     documentService
  //   );
  // }
}
