import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreGroupeComponent } from "./explore-groupe.component";
import { SidebarExploreGroupeComponent } from "./sidebar-explore-groupe/sidebar-explore-groupe.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ExploreGroupeComponent,
    children: [
      {
        path: "tribune",
        loadChildren: () =>
          import("./../discussion/discussion.module").then(
            (module) => module.DiscussionModule
          ),
      },
      {
        path: "",
        loadChildren: () =>
          import("./../groupe/groupe.module").then(
            (module) => module.GroupeModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ExploreGroupeComponent, SidebarExploreGroupeComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ExploreGroupeModule {}
