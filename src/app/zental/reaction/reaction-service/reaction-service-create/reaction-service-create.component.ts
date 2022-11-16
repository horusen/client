import { Component, OnInit } from "@angular/core";
import { EnregistreurAudioService } from "src/app/shared/enregistreur/enregistreur-audio.service";

import { DocumentHandlerService } from "src/app/shared/services/document-handle.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ServiceService } from "src/app/zental/service/service.service";
import { DiscussionService } from "src/app/zental/toloba/discussion/discussion/discussion.service";
import { ReactionCreateComponent } from "../../reaction/reaction-create/reaction-create.component";
import { ReactionService } from "../../reaction/reaction.service";

@Component({
  selector: "app-reaction-service-create",
  templateUrl: "./reaction-service-create.component.html",
  styleUrls: ["./reaction-service-create.component.scss"],
})
export class ReactionServiceCreateComponent
  extends ReactionCreateComponent
  implements OnInit
{
  service: any;
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public documentService: DocumentHandlerService,
    public enregistreurService: EnregistreurAudioService,
    public imageHandlerService: ImageHandlerService,
    public serviceService: ServiceService
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
    this._subscription["service"] = this.serviceService.singleData$.subscribe(
      (service) => {
        this.service = service;
        if (this.form.contains("service"))
          this.formValuePatcher("service", service.id);
        else this.addControl("service", service.id, true);
      }
    );
  }
}
