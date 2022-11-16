import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiscussionEntiteDiplomatiqueComponent } from "./discussion-entite-diplomatique.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { DiscussionModule } from "../discussion/discussion.module";

const routes: Routes = [
  {
    path: ":id",
    component: DiscussionEntiteDiplomatiqueComponent,
  },
  {
    path: "**",
    redirectTo: "../",
  },
];

@NgModule({
  declarations: [DiscussionEntiteDiplomatiqueComponent],
  imports: [
    CommonModule,
    SharedModule,
    DiscussionModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DiscussionEntiteDiplomatiqueModule {}
