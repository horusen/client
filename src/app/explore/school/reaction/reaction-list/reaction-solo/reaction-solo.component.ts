import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ImageViewerService } from "src/app/shared/image-viewer/image-viewer.service";
import { Fichier } from "src/app/shared/models/fichier.model";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ReactionService } from "../../reaction.service";

@Component({
  selector: "app-reaction-solo",
  templateUrl: "./reaction-solo.component.html",
  styleUrls: ["./reaction-solo.component.scss"],
})
export class ReactionSoloComponent extends BaseComponent implements OnInit {
  @Input() reaction: any;
  @Input() parentUrl: string;
  @Input() reversed: boolean = false;
  constructor(
    public reactionService: ReactionService,
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
}
