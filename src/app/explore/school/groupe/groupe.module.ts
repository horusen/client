import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupeComponent } from "./groupe.component";
import { GroupeListComponent } from "./groupe-list/groupe-list.component";
import { Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { GroupeCreateComponent } from "./groupe-create/groupe-create.component";
import { GroupeClasseListComponent } from "./groupe-classe-list/groupe-classe-list.component";
import { GroupeListByProfesseurComponent } from "./groupe-list-by-professeur/groupe-list-by-professeur.component";
import { GroupeIndependantListComponent } from "./groupe-independant-list/groupe-independant-list.component";
import { GroupeListByEtablissementComponent } from "./groupe-list-by-etablissement/groupe-list-by-etablissement.component";
import { GroupeShowComponent } from "./groupe-show/groupe-show.component";
import { GroupeDetailsComponent } from "./groupe-show/groupe-details/groupe-details.component";
import { GroupeEditComponent } from "./groupe-edit/groupe-edit.component";
import { FilterGroupeComponent } from "./filter-groupe/filter-groupe.component";
import { GroupeStatsComponent } from "./groupe-stats/groupe-stats.component";
import { GroupeShowAltComponent } from "./groupe-show-alt/groupe-show-alt.component";
import { GroupeShowAltDetailsComponent } from "./groupe-show-alt/groupe-show-alt-details/groupe-show-alt-details.component";
import { GroupeShowAltMembreComponent } from "./groupe-show-alt/groupe-show-alt-membre/groupe-show-alt-membre.component";
import { SharedSchoolModule } from "../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: "",
    component: GroupeComponent,
    children: [
      {
        path: "statistiques",
        component: GroupeStatsComponent,
      },
      // show
      {
        path: ":id",
        component: GroupeShowAltComponent,
        children: [
          {
            path: "",
            component: GroupeShowAltDetailsComponent,
          },
          {
            path: "membres",
            loadChildren: () =>
              import("./groupe-show/membre-groupe/membre-groupe.module").then(
                (module) => module.MembreGroupeModule
              ),
          },
          // {
          //   path: "tache",
          //   loadChildren: () =>
          //     import("./groupe-show/tache-groupe/tache-groupe.module").then(
          //       (module) => module.TacheGroupeModule
          //     ),
          // },
          // {
          //   path: "tribune",
          //   loadChildren: () =>
          //     import("./../discussion/discussion.module").then(
          //       (module) => module.DiscussionModule
          //     ),
          // },
        ],
      },
    ],
  },

  // {
  //   path: ":id",
  //   component: GroupeShowComponent,
  //   children: [
  //     {
  //       path: "",
  //       component: GroupeDetailsComponent,
  //     },
  //     {
  //       path: "membre",
  //       loadChildren: () =>
  //         import("./groupe-show/membre-groupe/membre-groupe.module").then(
  //           (module) => module.MembreGroupeModule
  //         ),
  //     },
  //     {
  //       path: "tache",
  //       loadChildren: () =>
  //         import("./groupe-show/tache-groupe/tache-groupe.module").then(
  //           (module) => module.TacheGroupeModule
  //         ),
  //     },
  //     {
  //       path: "tribune",
  //       loadChildren: () =>
  //         import("./../discussion/discussion.module").then(
  //           (module) => module.DiscussionModule
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: "details",
  //   loadChildren: () =>
  //     import("./groupe-show/groupe-show.module").then(
  //       (module) => module.GroupeShowModule
  //     ),
  // },
];

@NgModule({
  declarations: [
    GroupeComponent,
    GroupeListComponent,
    GroupeCreateComponent,
    GroupeClasseListComponent,
    GroupeListByProfesseurComponent,
    GroupeIndependantListComponent,
    GroupeListByEtablissementComponent,
    GroupeShowComponent,
    GroupeDetailsComponent,
    GroupeEditComponent,
    FilterGroupeComponent,
    GroupeStatsComponent,
    GroupeShowAltComponent,
    GroupeShowAltDetailsComponent,
    GroupeShowAltMembreComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class GroupeModule {}
