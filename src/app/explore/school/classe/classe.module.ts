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

const routes: Routes = [
  {
    path: "",
    component: ClasseComponent,
    children: [
      {
        path: ":id",
        component: ClasseShowComponent,
        children: [
          // Classe details
          { path: "", component: ClasseShowDetailsComponent },
    
          // Tache
          { path: "tache", component: TacheListByClasseComponent },
    
          // Eleve
          {
            path: "eleve",
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
    
          // Professeur
          {
            path: "professeur",
            loadChildren: () =>
              import("./../professeur/professeur.module").then(
                (module) => module.ProfesseurModule
              ),
          },
        ],
      },
    ]
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
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasseModule {}
