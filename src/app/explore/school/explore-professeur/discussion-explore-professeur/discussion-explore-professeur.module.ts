import { RouterModule } from "@angular/router";
import { DiscussionModule } from "./../../discussion/discussion.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionExploreProfesseurComponent } from "./discussion-explore-professeur.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: DiscussionExploreProfesseurComponent,
  },
];

@NgModule({
  declarations: [DiscussionExploreProfesseurComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    DiscussionModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DiscussionExploreProfesseurModule {}
