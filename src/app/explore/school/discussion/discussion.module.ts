import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionComponent } from "./discussion.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { DiscussionGroupeListComponent } from "./discussion-groupe-list/discussion-groupe-list.component";
import { DiscussionSousReseauxListComponent } from "./discussion-sous-reseaux-list/discussion-sous-reseaux-list.component";
import { ReactionDiscussionComponent } from "./reaction-discussion/reaction-discussion.component";
import { ReactionModule } from "../reaction/reaction.module";
import { DiscussionProfilAdministrationListComponent } from "./discussion-profil-administration-list/discussion-profil-administration-list.component";
import { DernieresDiscussionsComponent } from "./dernieres-discussions/dernieres-discussions.component";
import { RouterModule, Routes } from "@angular/router";
import { SujetModule } from "./sujet/sujet.module";

const routes: Routes = [
  {
    path: "",
    component: DiscussionComponent,
  },
];

@NgModule({
  declarations: [
    DiscussionComponent,
    DiscussionGroupeListComponent,
    DiscussionSousReseauxListComponent,
    ReactionDiscussionComponent,
    DiscussionProfilAdministrationListComponent,
    DernieresDiscussionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SujetModule,
    SharedSchoolModule,
    ReactionModule,
    RouterModule.forChild(routes),
  ],
  exports: [DiscussionComponent, ReactionDiscussionComponent, RouterModule],
})
export class DiscussionModule {}
