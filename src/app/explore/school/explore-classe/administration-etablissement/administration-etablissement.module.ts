import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AdministrationEtablissementComponent } from "./administration-etablissement.component";
import { AdminsitrationEtablissementListComponent } from "./adminsitration-etablissement-list/adminsitration-etablissement-list.component";
import { AdminsitrationEtablissementShowComponent } from "./adminsitration-etablissement-show/adminsitration-etablissement-show.component";

const routes: Routes = [
  {
    path: "",
    component: AdministrationEtablissementComponent,
    children: [
      {
        path: "",
        component: AdminsitrationEtablissementListComponent,
      },
      {
        path: ":id",
        component: AdminsitrationEtablissementShowComponent,
        children: [
          {
            path: "structure",
            loadChildren: () =>
              import("./../../employe/employe.module").then(
                (module) => module.EmployeModule
              ),
          },
          // classe
          {
            path: "classe",
            loadChildren: () =>
              import("./../../classe/classe.module").then(
                (module) => module.ClasseModule
              ),
          },
          // Professeur
          {
            path: "professeur",
            loadChildren: () =>
              import("./../../professeur/professeur.module").then(
                (module) => module.ProfesseurModule
              ),
          },
          // Groupe
          {
            path: "groupes",
            loadChildren: () =>
              import("./../../groupe/groupe.module").then(
                (module) => module.GroupeModule
              ),
          },

          // Parent d'élèves
          {
            path: "parents-eleves",
            loadChildren: () =>
              import("./../../parent-eleve/parent-eleve.module").then(
                (module) => module.ParentEleveModule
              ),
          },
          // Élèves
          {
            path: "eleve",
            loadChildren: () =>
              import("./../../eleve/eleve.module").then(
                (module) => module.EleveModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdministrationEtablissementComponent,
    AdminsitrationEtablissementListComponent,
    AdminsitrationEtablissementShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationEtablissementModule {}
