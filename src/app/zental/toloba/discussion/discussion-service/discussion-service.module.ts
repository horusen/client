import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionServiceComponent } from "./discussion-service.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { DiscussionModule } from "../discussion/discussion.module";

const routes: Routes = [
  {
    path: ":id",
    component: DiscussionServiceComponent,
  },
  {
    path: "**",
    redirectTo: "../",
  },
];

@NgModule({
  declarations: [DiscussionServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    DiscussionModule,
  ],
  exports: [RouterModule],
})
export class DiscussionServiceModule {}
