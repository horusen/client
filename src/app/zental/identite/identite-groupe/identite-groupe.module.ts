import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IdentiteGroupeComponent } from "./identite-groupe.component";
import { GroupeModule } from "../../groupe/groupe/groupe.module";
import { RouterModule, Routes } from "@angular/router";
import { GroupeShowComponent } from "../../groupe/groupe/groupe-show/groupe-show.component";
import { GroupeDetailsComponent } from "../../groupe/groupe/groupe-details/groupe-details.component";

const routes: Routes = [
  {
    path: "",
    component: IdentiteGroupeComponent,
  },
  {
    path: ":id",
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
];

@NgModule({
  declarations: [IdentiteGroupeComponent],
  imports: [CommonModule, GroupeModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentiteGroupeModule {}
