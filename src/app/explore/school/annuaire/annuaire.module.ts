import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnnuaireComponent } from "./annuaire.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AnnuaireComponent,
    children: [
      {
        path: "structure",
        loadChildren: () =>
          import("./../etablissement/etablissement.module").then(
            (module) => module.EtablissementModule
          ),
      },
      {
        path: "eleve",
        loadChildren: () =>
          import("./../eleve/eleve.module").then(
            (module) => module.EleveModule
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
];

@NgModule({
  declarations: [AnnuaireComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnnuaireModule {}
