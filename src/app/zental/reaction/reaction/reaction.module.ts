import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactionComponent } from "./reaction.component";
import { ReactionListComponent } from "./reaction-list/reaction-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedReactionModule } from "../shared-reaction/shared-reaction.module";
import { ReactionCreateComponent } from "./reaction-create/reaction-create.component";

@NgModule({
  declarations: [
    ReactionComponent,
    ReactionListComponent,
    ReactionCreateComponent,
  ],
  imports: [CommonModule, SharedModule, SharedReactionModule],
  exports: [ReactionComponent],
})
export class ReactionModule {}
