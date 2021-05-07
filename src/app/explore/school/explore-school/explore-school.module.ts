import { SidebarExploreSchoolModule } from "./sidebar-explore-school/sidebar-explore-school.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreSchoolComponent } from "./explore-school.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: ExploreSchoolComponent,
    children: [
      // Affectation
      {
        path: "",
        loadChildren: () =>
          import("./../tache/affectation-tache/affectation-tache.module").then(
            (module) => module.AffectationTacheModule
          ),
      },
      // Groupe
      {
        path: "groupe",
        loadChildren: () =>
          import("../groupe/groupe.module").then(
            (module) => module.GroupeModule
          ),
      },
      // Tache
      {
        path: "mes-taches",
        loadChildren: () =>
          import("./../tache/tache.module").then(
            (module) => module.TacheModule
          ),
      },
      // Professeur
      {
        path: "professeur",
        loadChildren: () =>
          import("./../professeur/professeur.module").then(
            (module) => module.ProfesseurModule
          ),
      },
      // Suivie tache
      {
        path: "suivie",
        loadChildren: () =>
          import("./../tache/suivie-tache/suivie-tache.module").then(
            (module) => module.SuivieTacheModule
          ),
      },
      // Fichier
      {
        path: "document",
        loadChildren: () =>
          import("./../../../file-manager/file-manager.module").then(
            (module) => module.FileManagerModule
          ),
      },
      // Ancien groupe
      {
        path: "ancien-groupe",
        loadChildren: () =>
          import("../groupe/groupe.module").then(
            (module) => module.GroupeModule
          ),
      },


      // Mes taches
      // {
      //   path: "mes-taches",
      //   loadChildren: () =>
      //     import("./../mes-taches/mes-taches.module").then(
      //       (module) => module.MesTachesModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  declarations: [ExploreSchoolComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SidebarExploreSchoolModule,
  ],
  exports: [RouterModule],
})
export class ExploreSchoolModule { }
