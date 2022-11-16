import { Component, Input, OnInit } from "@angular/core";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ReactionService } from "../../reaction/reaction.service";
import { ReactionUtilisateurComponent } from "../reaction-utilisateur/reaction-utilisateur.component";

@Component({
  selector: "app-reaction-solo-service",
  templateUrl: "./reaction-solo-service.component.html",
  styleUrls: ["./reaction-solo-service.component.scss"],
})
export class ReactionSoloServiceComponent
  extends ReactionUtilisateurComponent
  implements OnInit
{
  constructor(
    public reactionService: ReactionService,
    public imageHandlerService: ImageHandlerService
  ) {
    super(reactionService, imageHandlerService);
  }

  ngOnInit(): void {}
}
