import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationBureauComponent } from "./administration-bureau.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AdministrationBureauComponent,
    children: [
      {
        path: "ressources-humaines",
        loadChildren: () =>
          import("./../bureau-employe/bureau-employe.module").then(
            (module) => module.BureauEmployeModule
          ),
      },
      {
        path: "departements",
        loadChildren: () =>
          import("./../bureau-departement/bureau-departement.module").then(
            (module) => module.BureauDepartementModule
          ),
      },

      {
        path: "services",
        loadChildren: () =>
          import("./../bureau-service/bureau-service.module").then(
            (module) => module.BureauServiceModule
          ),
      },

      {
        path: "domaines",
        loadChildren: () =>
          import("./../bureau-domaine/bureau-domaine.module").then(
            (module) => module.BureauDomaineModule
          ),
      },
      {
        path: "postes",
        loadChildren: () =>
          import("./../bureau-poste/bureau-poste.module").then(
            (module) => module.BureauPosteModule
          ),
      },
      {
        path: "fonctions",
        loadChildren: () =>
          import("./../bureau-fonction/bureau-fonction.module").then(
            (module) => module.BureauFonctionModule
          ),
      },
      {
        path: "inscriptions-consulaires",
        loadChildren: () =>
          import(
            "./../bureau-inscription-consulaire/bureau-inscription-consulaire.module"
          ).then((module) => module.BureauInscriptionConsulaireModule),
      },
      {
        path: "toloba",
        loadChildren: () =>
          import("../bureau-toloba/bureau-toloba.module").then(
            (module) => module.BureauTolobaModule
          ),
      },
      {
        path: "**",
        redirectTo: "domaines",
      },
    ],
  },
];

@NgModule({
  declarations: [AdministrationBureauComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationBureauModule {}
