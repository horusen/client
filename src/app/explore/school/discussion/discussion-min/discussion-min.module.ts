import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionMinComponent } from "./discussion-min.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactionDiscussionMinComponent } from "./reaction-discussion-min/reaction-discussion-min.component";
import { ReactionModule } from "../../reaction/reaction.module";
import { ReactionListDiscussionMinComponent } from "./reaction-list-discussion-min/reaction-list-discussion-min.component";
import { ReactionCreateDiscussionMinComponent } from "./reaction-create-discussion-min/reaction-create-discussion-min.component";
import { FichierDiscussionMinComponent } from "./fichier-discussion-min/fichier-discussion-min.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";
import { TunelModule } from "../../tache/tunel/tunel.module";

@NgModule({
  declarations: [
    DiscussionMinComponent,
    ReactionDiscussionMinComponent,
    ReactionListDiscussionMinComponent,
    ReactionCreateDiscussionMinComponent,
    FichierDiscussionMinComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactionModule,
    SharedSchoolModule,
    TunelModule,
  ],
  exports: [DiscussionMinComponent],
})
export class DiscussionMinModule {}
