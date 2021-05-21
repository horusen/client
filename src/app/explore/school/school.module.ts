import { ExploreTacheRouteGuardGuard } from "./explore-tache-route-guard.guard";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchoolComponent } from "./school.component";
import { Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TunelModule } from "./tache/tunel/tunel.module";
import { DiscussionMinModule } from "./discussion/discussion-min/discussion-min.module";
import { SharedSchoolModule } from "./shared-school/shared-school.module";
import { ProfesseurGuard } from "./professeur.guard";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

const routes: Routes = [
  {
    path: "",
    component: SchoolComponent,
    children: [
      // Etablissement
      {
        path: "echo",
        loadChildren: () =>
          import("./explore-classe/explore-classe.module").then(
            (module) => module.ExploreClasseModule // On a renommer classe en etablissement dans la vue
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
        canActivate: [ProfesseurGuard],
      },

      // Explore school
      {
        path: "tache",
        loadChildren: () =>
          import("./explore-school/explore-school.module").then(
            (module) => module.ExploreSchoolModule
          ),
        canActivate: [ExploreTacheRouteGuardGuard],
      },

      {
        path: "administration",
        loadChildren: () =>
          import(
            "./explore-classe/administration-etablissement/administration-etablissement.module"
          ).then((module) => module.AdministrationEtablissementModule),
      },

      // Redirection
      {
        path: "",
        redirectTo: "tache",
      },
    ],
  },
];

@NgModule({
  declarations: [SchoolComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TunelModule,
    SharedSchoolModule,
    DiscussionMinModule,
  ],
  exports: [RouterModule],
})
export class SchoolModule {}
