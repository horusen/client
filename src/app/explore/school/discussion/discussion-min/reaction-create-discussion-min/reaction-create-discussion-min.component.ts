import { ReactionCreateComponent } from "./../../../reaction/reaction-create/reaction-create.component";
import { Component, OnInit } from "@angular/core";
import { ReactionService } from "../../../reaction/reaction.service";
import { DiscussionService } from "../../discussion.service";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";

@Component({
  selector: "app-reaction-create-discussion-min",
  templateUrl: "./reaction-create-discussion-min.component.html",
  styleUrls: ["./reaction-create-discussion-min.component.scss"],
})
export class ReactionCreateDiscussionMinComponent
  extends ReactionCreateComponent
  implements OnInit {
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public enregistreurService: EnregistreurAudioService,
    public imageService: ImageHandlerService,
    public documentService: DocumentHandlerService
  ) {
    super(
      reactionService,
      discussionService,
      enregistreurService,
      imageService,
      documentService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
