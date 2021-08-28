import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactionEntiteDiplomatiqueComponent } from "./reaction-entite-diplomatique.component";
import { ReactionEntiteDiplomatiqueListComponent } from "./reaction-entite-diplomatique-list/reaction-entite-diplomatique-list.component";
import { ReactionEntiteDiplomatiqueCreateComponent } from "./reaction-entite-diplomatique-create/reaction-entite-diplomatique-create.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedReactionModule } from "../shared-reaction/shared-reaction.module";

@NgModule({
  declarations: [
    ReactionEntiteDiplomatiqueComponent,
    ReactionEntiteDiplomatiqueListComponent,
    ReactionEntiteDiplomatiqueCreateComponent,
  ],
  imports: [CommonModule, SharedModule, SharedReactionModule],
  exports: [ReactionEntiteDiplomatiqueComponent],
})
export class ReactionEntiteDiplomatiqueModule {}
