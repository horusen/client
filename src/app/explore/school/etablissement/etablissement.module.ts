import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";
import { EtablissementShowComponent } from "./etablissement-show/etablissement-show.component";
import { SharedEtablissementModule } from "./shared-etablissement/shared-etablissement.module";
import { EtablissementComponent } from "./etablissement.component";
import { EtablissementListContainerComponent } from "./etablissement-list-container/etablissement-list-container.component";
import { AdministrateurEtablissementComponent } from "./administrateur-etablissement/administrateur-etablissement.component";
import { EtablissementShowDetailsComponent } from "./etablissement-show/etablissement-show-details/etablissement-show-details.component";
import { EtablissementAffiliesComponent } from "./etablissement-affilies/etablissement-affilies.component";

const routes: Routes = [
  {
    path: "",
    component: EtablissementListContainerComponent,
  },
  {
    path: ":id",
    component: EtablissementShowComponent,
    children: [
      {
        path: "",
        component: EtablissementShowDetailsComponent,
      },
      {
        path: "programme",
        loadChildren: () =>
          import("./../programme/programme.module").then(
            (module) => module.ProgrammeModule
          ),
      },
      {
        path: "formation",
        loadChildren: () =>
          import("./../formation/formation.module").then(
            (module) => module.FormationModule
          ),
      },
      {
        path: "structure",
        loadChildren: () =>
          import("./../employe/employe.module").then(
            (module) => module.EmployeModule
          ),
      },
      // classe
      {
        path: "classe",
        loadChildren: () =>
          import("./../classe/classe.module").then(
            (module) => module.ClasseModule
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
      // Groupe
      {
        path: "groupes",
        loadChildren: () =>
          import("./../groupe/groupe.module").then(
            (module) => module.GroupeModule
          ),
      },

      // Parent d'élèves
      {
        path: "parents-eleves",
        loadChildren: () =>
          import("./../parent-eleve/parent-eleve.module").then(
            (module) => module.ParentEleveModule
          ),
      },
      // Élèves
      {
        path: "eleve",
        loadChildren: () =>
          import("./../eleve/eleve.module").then(
            (module) => module.EleveModule
          ),
      },

      // Administrateur
      {
        path: "administrateur",
        loadChildren: () =>
          import(
            "./../etablissement/admin-etablissement/admin-etablissement.module"
          ).then((module) => module.AdminEtablissementModule),
      },

      // Service
      {
        path: "service",
        loadChildren: () =>
          import(
            "./../etablissement/service-etablissement/service-etablissement.module"
          ).then((module) => module.ServiceEtablissementModule),
      },

      // Etablissement affilié
      {
        path: "etablissements-affilies",
        component: EtablissementAffiliesComponent,
      },

      // Explore
      {
        path: "explore",
        loadChildren: () =>
          import("./../discussion/discussion.module").then(
            (module) => module.DiscussionModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    EtablissementComponent,
    EtablissementShowComponent,
    EtablissementListContainerComponent,
    AdministrateurEtablissementComponent,
    EtablissementShowDetailsComponent,
    EtablissementAffiliesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SharedEtablissementModule,
  ],
  exports: [RouterModule],
})
export class EtablissementModule {}
