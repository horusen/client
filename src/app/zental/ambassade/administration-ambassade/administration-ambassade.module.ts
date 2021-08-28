import { RouterModule } from "@angular/router";
import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationAmbassadeComponent } from "./administration-ambassade.component";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdministrationAmbassadeComponent,
    children: [
      {
        path: "consulats",
        loadChildren: () =>
          import("./../ambassade-consulat/ambassade-consulat.module").then(
            (module) => module.AmbassadeConsulatModule
          ),
      },
      {
        path: "bureaux",
        loadChildren: () =>
          import("./../ambassade-bureaux/ambassade-bureaux.module").then(
            (module) => module.AmbassadeBureauxModule
          ),
      },
      {
        path: "liaisons",
        loadChildren: () =>
          import("./../ambassade-liaison/ambassade-liaison.module").then(
            (module) => module.AmbassadeLiaisonModule
          ),
      },

      {
        path: "departements",
        loadChildren: () =>
          import(
            "./../ambassade-departement/ambassade-departement.module"
          ).then((module) => module.AmbassadeDepartementModule),
      },
      {
        path: "domaines",
        loadChildren: () =>
          import("./../ambassade-domaine/ambassade-domaine.module").then(
            (module) => module.AmbassadeDomaineModule
          ),
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../ambassade-service/ambassade-service.module").then(
            (module) => module.AmbassadeServiceModule
          ),
      },
      {
        path: "fonctions",
        loadChildren: () =>
          import("./../ambassade-fonctions/ambassade-fonctions.module").then(
            (module) => module.AmbassadeFonctionsModule
          ),
      },
      {
        path: "postes",
        loadChildren: () =>
          import("./../ambassade-poste/ambassade-poste.module").then(
            (module) => module.AmbassadePosteModule
          ),
      },
      {
        path: "ressources-humaines",
        loadChildren: () =>
          import("./../ambassade-employe/ambassade-employe.module").then(
            (module) => module.AmbassadeEmployeModule
          ),
      },
      {
        path: "inscriptions-consulaires",
        loadChildren: () =>
          import(
            "./../ambassade-inscription-consulaire/ambassade-inscription-consulaire.module"
          ).then((module) => module.AmbassadeInscriptionConsulaireModule),
      },
      {
        path: "citoyens",
        loadChildren: () =>
          import("./../ambassade-citoyen/ambassade-citoyen.module").then(
            (module) => module.AmbassadeCitoyenModule
          ),
      },
      {
        path: "toloba",
        loadChildren: () =>
          import("./../ambassade-toloba/ambassade-toloba.module").then(
            (module) => module.AmbassadeTolobaModule
          ),
      },
      {
        path: "**",
        redirectTo: "consulats",
      },
    ],
  },
];

@NgModule({
  declarations: [AdministrationAmbassadeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationAmbassadeModule {}
