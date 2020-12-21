import { ExploreClasseDetailsComponent } from "./explore-classe-details/explore-classe-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreClasseComponent } from "./explore-classe.component";
import { RouterModule, Routes } from "@angular/router";
import { SidebarExploreClasseComponent } from "./sidebar-explore-classe/sidebar-explore-classe.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: "",
    component: ExploreClasseComponent,
    children: [
      {
        path: ":id",
        component: ExploreClasseDetailsComponent,
        children: [
          // groupe
          {
            path: "groupe",
            loadChildren: () =>
              import("./../groupe/groupe.module").then(
                (module) => module.GroupeModule
              ),
          },
          // Eleve
          {
            path: "eleves",
            loadChildren: () =>
              import("./../eleve/eleve.module").then(
                (module) => module.EleveModule
              ),
          },

          // Redirection
          {
            path: "",
            redirectTo: "groupe",
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ExploreClasseComponent,
    SidebarExploreClasseComponent,
    ExploreClasseDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedSchoolModule,
    // ClasseModule,
  ],
  exports: [RouterModule],
})
export class ExploreClasseModule {}
