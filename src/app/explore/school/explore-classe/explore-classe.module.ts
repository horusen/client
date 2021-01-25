import { ExploreClasseDetailsComponent } from "./explore-classe-details/explore-classe-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExploreClasseComponent } from "./explore-classe.component";
import { RouterModule, Routes } from "@angular/router";
import { SidebarExploreClasseComponent } from "./sidebar-explore-classe/sidebar-explore-classe.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { DiscussionMinModule } from "../discussion/discussion-min/discussion-min.module";
import { SidebarExploreClasseEtablissementListComponent } from "./sidebar-explore-classe/sidebar-explore-classe-etablissement-list/sidebar-explore-classe-etablissement-list.component";
import { ExploreClasseShowComponent } from "./explore-classe-show/explore-classe-show.component";

const routes: Routes = [
  {
    path: "",
    component: ExploreClasseComponent,
    children: [
      // type etablissement
      {
        path: "",
        loadChildren: () =>
          import(
            "./../etablissement/type-etablissement/type-etablissement.module"
          ).then((module) => module.TypeEtablissementModule),
      },
      {
        path: 'type',
        redirectTo: ""
      },

      // etablissement list
      {
        path: 'type/:id',
        loadChildren: () => import('./../etablissement/etablissement.module').then(module => module.EtablissementModule)
      },


      // Administration
      {
        path: "administration",
        loadChildren: () =>
          import(
            "./administration-etablissement/administration-etablissement.module"
          ).then((module) => module.AdministrationEtablissementModule),
      },

      // Administration
      {
        path: "annuaire",
        loadChildren: () =>
          import("./../annuaire/annuaire.module").then(
            (module) => module.AnnuaireModule
          ),
      },

      // Hierarchie
      {
        path: "hierarchie",
        loadChildren: () =>
          import(
            "./../etablissement/hierarchie-etablissement/hierarchie-etablissement.module"
          ).then((module) => module.HierarchieEtablissementModule),
      },

      // {
      //   path: ":id",
      //   loadChildren: () =>
      //     import("./../employe/employe.module").then(
      //       (module) => module.EmployeModule
      //     ),
      // children: [
      //   {
      //     path: "groupe",
      //     loadChildren: () =>
      //       import("./../groupe/groupe.module").then(
      //         (module) => module.GroupeModule
      //       ),
      //   },
      //   {
      //     path: "eleves",
      //     loadChildren: () =>
      //       import("./../eleve/eleve.module").then(
      //         (module) => module.EleveModule
      //       ),
      //   },
      //   {
      //     path: "administration",
      //     loadChildren: () =>
      //       import("./../administration/administration.module").then(
      //         (module) => module.AdministrationModule
      //       ),
      //   },
      //   {
      //     path: "",
      //     redirectTo: "groupe",
      //   },
      // ],
      // },
    ],
  },
];

@NgModule({
  declarations: [
    ExploreClasseComponent,
    SidebarExploreClasseComponent,
    ExploreClasseDetailsComponent,
    SidebarExploreClasseEtablissementListComponent,
    ExploreClasseShowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SharedSchoolModule,
    DiscussionMinModule,
    // ClasseModule,
  ],
  exports: [RouterModule],
})
export class ExploreClasseModule {}
