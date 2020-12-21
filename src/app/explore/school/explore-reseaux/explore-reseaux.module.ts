import { ReseauxShowComponent } from "./../reseaux/reseaux-show/reseaux-show.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreReseauxComponent } from "./explore-reseaux.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { SidebarExploreReseauxComponent } from "./sidebar-explore-reseaux/sidebar-explore-reseaux.component";

const routes: Routes = [
  {
    path: "",
    component: ExploreReseauxComponent,
    children: [
      {
        path: ":id",
        loadChildren: () =>
          import("./../reseaux/reseaux.module").then(
            (module) => module.ReseauxModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ExploreReseauxComponent, SidebarExploreReseauxComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ExploreReseauxModule {}
