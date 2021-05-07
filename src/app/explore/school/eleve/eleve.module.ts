import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EleveComponent } from "./eleve.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EleveListComponent } from "./eleve-list/eleve-list.component";
import { Routes } from "@angular/router";
import { EleveListByProfesseurComponent } from "./eleve-list-by-professeur/eleve-list-by-professeur.component";
import { EleveListByEtablissementComponent } from "./eleve-list-by-etablissement/eleve-list-by-etablissement.component";
import { EleveListHorsEtablissementComponent } from "./eleve-list-hors-etablissement/eleve-list-hors-etablissement.component";
import { EleveAddComponent } from "./eleve-add/eleve-add.component";
import { EleveStatsComponent } from "./eleve-stats/eleve-stats.component";
import { EleveShowComponent } from "./eleve-show/eleve-show.component";
import { EleveShowDetailsComponent } from "./eleve-show/eleve-show-details/eleve-show-details.component";
import { EleveShowGroupeComponent } from "./eleve-show/eleve-show-groupe/eleve-show-groupe.component";
import { EleveShowTacheComponent } from "./eleve-show/eleve-show-tache/eleve-show-tache.component";
import { EleveShowParentComponent } from "./eleve-show/eleve-show-parent/eleve-show-parent.component";
import { EleveShowProfesseurComponent } from "./eleve-show/eleve-show-professeur/eleve-show-professeur.component";
import { SharedSchoolModule } from "../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: "",
    component: EleveComponent,
    children: [
      {
        path: "stats",
        component: EleveStatsComponent,
      },
      {
        path: ":id",
        component: EleveShowComponent,
        children: [
          {
            path: "",
            component: EleveShowDetailsComponent,
          },
          {
            path: "groupes",
            component: EleveShowGroupeComponent,
          },
          {
            path: "taches",
            component: EleveShowTacheComponent,
          },
          {
            path: "parents",
            component: EleveShowParentComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    EleveComponent,
    EleveListComponent,
    EleveListByProfesseurComponent,
    EleveListByEtablissementComponent,
    EleveListHorsEtablissementComponent,
    EleveAddComponent,
    EleveStatsComponent,
    EleveShowComponent,

    EleveShowGroupeComponent,
    EleveShowTacheComponent,
    EleveShowParentComponent,
    EleveShowProfesseurComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SharedSchoolModule,
  ],
  exports: [RouterModule],
})
export class EleveModule {}
