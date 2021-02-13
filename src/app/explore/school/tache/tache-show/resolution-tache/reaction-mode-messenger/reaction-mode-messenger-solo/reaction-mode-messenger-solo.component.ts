import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ImageViewerService } from "src/app/shared/image-viewer/image-viewer.service";
import { Fichier } from "src/app/shared/models/fichier.model";
import { AuthService } from "src/app/authentification/auth.service";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ReactionResolutionTacheService } from "../../resolution-tache/reaction-resolution-tache.service";

@Component({
  selector: "app-reaction-mode-messenger-solo",
  templateUrl: "./reaction-mode-messenger-solo.component.html",
  styleUrls: ["./reaction-mode-messenger-solo.component.scss"],
})
export class ReactionModeMessengerSoloComponent
  extends BaseComponent
  implements OnInit {
  @Input() reaction: any;
  @Input() parentUrl: string;
  @Input() reversed: boolean = false;
  constructor(
    public reactionService: ReactionResolutionTacheService,
    public auth: AuthService,
    public imageViewerService: ImageViewerService,
    public imageHandlerService: ImageHandlerService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {}

  afficherImage(file: Fichier): void {
    this.imageViewerService.displayImage(file);
  }

  rebondir() {
    this.reactionService.rebondissement$.next(this.reaction);
  }

  indexer(reaction: number) {
    this.reactionService.indexer(reaction).subscribe();
  }
}
