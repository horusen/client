import { MatTabsModule } from "@angular/material/tabs";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TolobaComponent } from "./toloba.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { DernieresDiscussionsModule } from "../discussion/dernieres-discussions/dernieres-discussions.module";
import { SharedTolobaModule } from "../shared-toloba/shared-toloba.module";
import { GroupeShowComponent } from "../../groupe/groupe/groupe-show/groupe-show.component";
import { GroupeDetailsComponent } from "../../groupe/groupe/groupe-details/groupe-details.component";

const routes: Routes = [
  {
    path: "",
    component: TolobaComponent,
    children: [
      {
        path: "discussion",
        loadChildren: () =>
          import("../discussion/discussion-user/discussion-user.module").then(
            (module) => module.DiscussionUserModule
          ),
      },
      {
        path: "diplomaties",
        loadChildren: () =>
          import("./diplomatie/diplomatie.module").then(
            (module) => module.DiplomatieModule
          ),
      },
      {
        path: "groupes/:id",
        component: GroupeShowComponent,
        children: [
          {
            path: "",
            component: GroupeDetailsComponent,
          },
          {
            path: "membres",
            loadChildren: () =>
              import("../../groupe/membre-groupe/membre-groupe.module").then(
                (module) => module.MembreGroupeModule
              ),
          },
          {
            path: "demandes",
            loadChildren: () =>
              import(
                "../../groupe/demande-adhesion-groupe/demande-adhesion-groupe.module"
              ).then((module) => module.DemandeAdhesionGroupeModule),
          },
        ],
      },
      {
        path: "groupes",
        redirectTo: "/toloba",
        pathMatch: "full",
      },

      // {
      //   path: "**",
      //   redirectTo: "discussion",
      // },
    ],
  },
];

@NgModule({
  declarations: [TolobaComponent],
  imports: [
    CommonModule,
    SharedModule,
    DernieresDiscussionsModule,
    MatTabsModule,
    SharedTolobaModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TolobaModule {}
