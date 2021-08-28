import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionComponent } from "./discussion.component";
import { ReactionModule } from "src/app/zental/reaction/reaction/reaction.module";
import { ReactionServiceModule } from "src/app/zental/reaction/reaction-service/reaction-service.module";
import { ReactionEntiteDiplomatiqueModule } from "src/app/zental/reaction/reaction-entite-diplomatique/reaction-entite-diplomatique.module";

@NgModule({
  declarations: [DiscussionComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactionModule,
    ReactionServiceModule,
    ReactionEntiteDiplomatiqueModule,
  ],
  exports: [DiscussionComponent],
})
export class DiscussionModule {}
