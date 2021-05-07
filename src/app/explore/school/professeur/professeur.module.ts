import { ProfesseurShowGroupeComponent } from "./professeur-show/professeur-show-groupe/professeur-show-groupe.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfesseurComponent } from "./professeur.component";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";
import { ProfesseurListByClasseComponent } from "./professeur-list-by-classe/professeur-list-by-classe.component";
import { ProfesseurListByEtablissementComponent } from "./professeur-list-by-etablissement/professeur-list-by-etablissement.component";
import { ProfesseurListHorsEtablissementComponent } from "./professeur-list-hors-etablissement/professeur-list-hors-etablissement.component";
import { ProfesseurListComponent } from "./professeur-list/professeur-list.component";
import { ProfesseurAddComponent } from "./professeur-add/professeur-add.component";
import { ProfesseurEditComponent } from "./professeur-edit/professeur-edit.component";
import { ProfesseurStatsComponent } from "./professeur-stats/professeur-stats.component";
import { ProfesseurShowComponent } from "./professeur-show/professeur-show.component";
import { ProfesseurShowTacheComponent } from "./professeur-show/professeur-show-tache/professeur-show-tache.component";
import { ProfesseurShowClasseComponent } from "./professeur-show/professeur-show-classe/professeur-show-classe.component";
import { ProfesseurShowDetailsComponent } from "./professeur-show/professeur-show-details/professeur-show-details.component";

const routes: Routes = [
  {
    path: "",
    component: ProfesseurComponent,
    children: [
      { path: "statistique", component: ProfesseurStatsComponent },
      {
        path: ":id",
        component: ProfesseurShowComponent,
        children: [
          { path: "groupe", component: ProfesseurShowGroupeComponent },
          { path: "tache", component: ProfesseurShowTacheComponent },
          { path: "classe", component: ProfesseurShowClasseComponent },
          { path: "", component: ProfesseurShowDetailsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProfesseurComponent,
    ProfesseurListByClasseComponent,
    ProfesseurListByEtablissementComponent,
    ProfesseurListHorsEtablissementComponent,
    ProfesseurListComponent,
    ProfesseurAddComponent,
    ProfesseurEditComponent,
    ProfesseurStatsComponent,
    ProfesseurShowComponent,
    ProfesseurShowDetailsComponent,
    ProfesseurShowGroupeComponent,
    ProfesseurShowTacheComponent,
    ProfesseurShowClasseComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesseurModule {}
