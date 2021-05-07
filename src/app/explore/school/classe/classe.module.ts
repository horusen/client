import { ProfesseurModule } from "./../professeur/professeur.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ClasseComponent } from "./classe.component";
import { ClasseListByProfesseurComponent } from "./classe-list-by-professeur/classe-list-by-professeur.component";
import { RouterModule, Routes } from "@angular/router";
import { ClasseListByEtablissementComponent } from "./classe-list-by-etablissement/classe-list-by-etablissement.component";
import { ClasseAddComponent } from "./classe-add/classe-add.component";
import { ClasseShowComponent } from "./classe-show/classe-show.component";
import { ClasseShowDetailsComponent } from "./classe-show/classe-show-details/classe-show-details.component";
import { TacheListByClasseComponent } from "./classe-show/tache-list-by-classe/tache-list-by-classe.component";
import { ClasseListComponent } from "./classe-list/classe-list.component";
import { ClasseEditComponent } from "./classe-edit/classe-edit.component";
import { ClasseStatsComponent } from "./classe-stats/classe-stats.component";
import { ClasseShowEleveComponent } from "./classe-show/classe-show-eleve/classe-show-eleve.component";
import { ClasseShowGroupeComponent } from "./classe-show/classe-show-groupe/classe-show-groupe.component";
import { ClasseShowProfesseurComponent } from "./classe-show/classe-show-professeur/classe-show-professeur.component";

const routes: Routes = [
  {
    path: "",
    component: ClasseComponent,
    children: [
      {
        path: "stats",
        component: ClasseStatsComponent,
      },
      {
        path: ":id",
        component: ClasseShowComponent,
        children: [
          { path: "", component: ClasseShowDetailsComponent },
          { path: "groupes", component: ClasseShowGroupeComponent },
          { path: "eleves", component: ClasseShowEleveComponent },
          { path: "professeurs", component: ClasseShowProfesseurComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ClasseComponent,
    ClasseListByProfesseurComponent,
    ClasseListByEtablissementComponent,
    ClasseAddComponent,
    ClasseShowComponent,
    ClasseShowDetailsComponent,
    TacheListByClasseComponent,
    ClasseListComponent,
    ClasseEditComponent,
    ClasseStatsComponent,
    ClasseShowEleveComponent,
    ClasseShowGroupeComponent,
    ClasseShowProfesseurComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasseModule {}
