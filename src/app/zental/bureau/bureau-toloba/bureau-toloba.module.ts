import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauTolobaComponent } from "./bureau-toloba.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TolobaEntiteDiplomatiqueModule } from "../../toloba/toloba-entite-diplomatique/toloba-entite-diplomatique.module";

const routes: Routes = [
  {
    path: "",
    component: BureauTolobaComponent,
    children: [
      {
        path: "discussion",
        loadChildren: () =>
          import(
            "../../toloba/discussion/discussion-entite-diplomatique/discussion-entite-diplomatique.module"
          ).then((module) => module.DiscussionEntiteDiplomatiqueModule),
      },
      {
        path: "diplomaties",
        loadChildren: () =>
          import("../../toloba/toloba/diplomatie/diplomatie.module").then(
            (module) => module.DiplomatieModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [BureauTolobaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TolobaEntiteDiplomatiqueModule,
  ],
  exports: [RouterModule],
})
export class BureauTolobaModule {}
