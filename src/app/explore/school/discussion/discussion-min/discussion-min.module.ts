import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionMinComponent } from "./discussion-min.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactionDiscussionMinComponent } from "./reaction-discussion-min/reaction-discussion-min.component";
import { ReactionModule } from "../../reaction/reaction.module";

@NgModule({
  declarations: [DiscussionMinComponent, ReactionDiscussionMinComponent],
  imports: [CommonModule, SharedModule, ReactionModule],
  exports: [DiscussionMinComponent],
})
export class DiscussionMinModule {}
