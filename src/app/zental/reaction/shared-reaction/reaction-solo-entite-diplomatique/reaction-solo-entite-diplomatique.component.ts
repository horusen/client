import { Component, OnInit } from "@angular/core";
import { ImageHandlerService } from "src/app/shared/services/image-handler.service";
import { ReactionService } from "../../reaction/reaction.service";
import { ReactionUtilisateurComponent } from "../reaction-utilisateur/reaction-utilisateur.component";

@Component({
  selector: "app-reaction-solo-entite-diplomatique",
  templateUrl: "./reaction-solo-entite-diplomatique.component.html",
  styleUrls: ["./reaction-solo-entite-diplomatique.component.scss"],
})
export class ReactionSoloEntiteDiplomatiqueComponent
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
