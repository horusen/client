import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactionUtilisateurComponent } from "./reaction-utilisateur/reaction-utilisateur.component";
import { ReactionSoloServiceComponent } from "./reaction-solo-service/reaction-solo-service.component";
import { RebondissementReactionComponent } from "./rebondissement-reaction/rebondissement-reaction.component";
import { ReactionSoloEntiteDiplomatiqueComponent } from "./reaction-solo-entite-diplomatique/reaction-solo-entite-diplomatique.component";

@NgModule({
  declarations: [
    ReactionUtilisateurComponent,
    ReactionSoloServiceComponent,
    RebondissementReactionComponent,
    ReactionSoloEntiteDiplomatiqueComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    ReactionUtilisateurComponent,
    ReactionSoloServiceComponent,
    ReactionSoloEntiteDiplomatiqueComponent,
  ],
})
export class SharedReactionModule {}
