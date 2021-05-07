import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreProfesseurComponent } from "./explore-professeur.component";
import { SidebarExploreProfesseurComponent } from "./sidebar-explore-professeur/sidebar-explore-professeur.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: "",
    component: ExploreProfesseurComponent,
    children: [
      // Classe
      {
        path: "classe",
        loadChildren: () =>
          import("./../classe/classe.module").then(
            (module) => module.ClasseModule
          ),
      },

      // Tache
      {
        path: "tache",
        loadChildren: () =>
          import("./../tache/tache.module").then(
            (module) => module.TacheModule
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

      // Eleve
      {
        path: "eleves",
        loadChildren: () =>
          import("./../eleve/eleve.module").then(
            (module) => module.EleveModule
          ),
      },

      // Groupe
      {
        path: "groupe",
        loadChildren: () =>
          import("./../groupe/groupe.module").then(
            (module) => module.GroupeModule
          ),
      },

      // Programme
      {
        path: "programme",
        loadChildren: () =>
          import("./../programme/programme.module").then(
            (module) => module.ProgrammeModule
          ),
      },

      // Fichier
      {
        path: "fichier",
        loadChildren: () =>
          import("./../../../file-manager/file-manager.module").then(
            (module) => module.FileManagerModule
          ),
      },

      // Fichier
      {
        path: "explore",
        loadChildren: () =>
          import(
            "./discussion-explore-professeur/discussion-explore-professeur.module"
          ).then((module) => module.DiscussionExploreProfesseurModule),
      },

      // professeur
      {
        path: "",
        loadChildren: () =>
          import("./../professeur/professeur.module").then(
            (module) => module.ProfesseurModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ExploreProfesseurComponent, SidebarExploreProfesseurComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedSchoolModule,
  ],
  exports: [RouterModule],
})
export class ExploreProfesseurModule {}
