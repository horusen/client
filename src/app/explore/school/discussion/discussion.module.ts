import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionComponent } from "./discussion.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { DiscussionProfesseurListComponent } from "./discussion-professeur-list/discussion-professeur-list.component";
import { DiscussionGroupeListComponent } from "./discussion-groupe-list/discussion-groupe-list.component";
import { DiscussionSousReseauxListComponent } from "./discussion-sous-reseaux-list/discussion-sous-reseaux-list.component";
import { ReactionDiscussionComponent } from "./reaction-discussion/reaction-discussion.component";
import { ReactionModule } from "../reaction/reaction.module";
import { DiscussionSujetReseauxListComponent } from "./discussion-sujet-reseaux-list/discussion-sujet-reseaux-list.component";
import { DiscussionProfilAdministrationListComponent } from "./discussion-profil-administration-list/discussion-profil-administration-list.component";

@NgModule({
  declarations: [
    DiscussionComponent,
    DiscussionProfesseurListComponent,
    DiscussionGroupeListComponent,
    DiscussionSousReseauxListComponent,
    ReactionDiscussionComponent,
    DiscussionSujetReseauxListComponent,
    DiscussionProfilAdministrationListComponent,
  ],
  imports: [CommonModule, SharedModule, SharedSchoolModule, ReactionModule],
  exports: [DiscussionComponent, ReactionDiscussionComponent],
})
export class DiscussionModule {}
