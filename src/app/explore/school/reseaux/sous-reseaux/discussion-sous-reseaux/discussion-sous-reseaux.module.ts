import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionSousReseauxComponent } from "./discussion-sous-reseaux.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../../../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";
import { DiscussionModule } from "../../../discussion/discussion.module";

const routes: Routes = [
  {
    path: "",
    component: DiscussionSousReseauxComponent,
  },
];

@NgModule({
  declarations: [DiscussionSousReseauxComponent],
  imports: [
    CommonModule,
    SharedModule,
    DiscussionModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DiscussionSousReseauxModule {}
