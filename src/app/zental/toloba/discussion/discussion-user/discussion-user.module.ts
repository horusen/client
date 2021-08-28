import { RouterModule } from "@angular/router";
import { SharedModule } from "./../../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionUserComponent } from "./discussion-user.component";
import { Routes } from "@angular/router";
import { DiscussionModule } from "../discussion/discussion.module";

const routes: Routes = [
  {
    path: ":id",
    component: DiscussionUserComponent,
  },
  {
    path: "**",
    redirectTo: "../",
  },
];

@NgModule({
  declarations: [DiscussionUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    DiscussionModule,
  ],
  exports: [RouterModule],
})
export class DiscussionUserModule {}
