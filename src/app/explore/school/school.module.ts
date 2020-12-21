import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchoolComponent } from "./school.component";
import { Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TunelModule } from "./tache/tunel/tunel.module";

const routes: Routes = [
  {
    path: "",
    component: SchoolComponent,
    children: [
      // Classe
      {
        path: "classe",
        loadChildren: () =>
          import("./explore-classe/explore-classe.module").then(
            (module) => module.ExploreClasseModule
          ),
      },

      // Groupe
      {
        path: "groupe-independant",
        loadChildren: () =>
          import("./explore-groupe/explore-groupe.module").then(
            (module) => module.ExploreGroupeModule
          ),
      },

      // Reseaux
      {
        path: "reseaux",
        loadChildren: () =>
          import("./explore-reseaux/explore-reseaux.module").then(
            (module) => module.ExploreReseauxModule
          ),
      },

      // Professeur
      {
        path: "professeur",
        loadChildren: () =>
          import("./explore-professeur/explore-professeur.module").then(
            (module) => module.ExploreProfesseurModule
          ),
      },

      // Explore school
      {
        path: "explore",
        loadChildren: () =>
          import("./explore-school/explore-school.module").then(
            (module) => module.ExploreSchoolModule
          ),
      },
      // Redirection
      {
        path: "",
        redirectTo: "explore",
      },
    ],
  },
];

@NgModule({
  declarations: [SchoolComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TunelModule,
  ],
  exports: [RouterModule],
})
export class SchoolModule {}
