import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationConsulatComponent } from "./administration-consulat.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdministrationConsulatComponent,
    children: [
      {
        path: "bureaux",
        loadChildren: () =>
          import("./../consulat-bureaux/consulat-bureaux.module").then(
            (module) => module.ConsulatBureauxModule
          ),
      },
      {
        path: "liaisons",
        loadChildren: () =>
          import("./../consulat-liaison/consulat-liaison.module").then(
            (module) => module.ConsulatLiaisonModule
          ),
      },
      {
        path: "departements",
        loadChildren: () =>
          import("./../consulat-departement/consulat-departement.module").then(
            (module) => module.ConsulatDepartementModule
          ),
      },
      {
        path: "domaines",
        loadChildren: () =>
          import("./../consulat-domaine/consulat-domaine.module").then(
            (module) => module.ConsulatDomaineModule
          ),
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../consulat-service/consulat-service.module").then(
            (module) => module.ConsulatServiceModule
          ),
      },
      {
        path: "fonctions",
        loadChildren: () =>
          import("./../consulat-fonction/consulat-fonction.module").then(
            (module) => module.ConsulatFonctionModule
          ),
      },
      {
        path: "postes",
        loadChildren: () =>
          import("./../consulat-poste/consulat-poste.module").then(
            (module) => module.ConsulatPosteModule
          ),
      },
      {
        path: "ressources-humaines",
        loadChildren: () =>
          import("./../consulat-employe/consulat-employe.module").then(
            (module) => module.ConsulatEmployeModule
          ),
      },
      {
        path: "inscriptions-consulaires",
        loadChildren: () =>
          import(
            "./../consulat-inscription-consulaire/consulat-inscription-consulaire.module"
          ).then((module) => module.ConsulatInscriptionConsulaireModule),
      },
      {
        path: "citoyens",
        loadChildren: () =>
          import("./../consulat-citoyen/consulat-citoyen.module").then(
            (module) => module.ConsulatCitoyenModule
          ),
      },
      {
        path: "toloba",
        loadChildren: () =>
          import("../consulat-toloba/consulat-toloba.module").then(
            (module) => module.ConsulatTolobaModule
          ),
      },
      {
        path: "**",
        redirectTo: "bureaux",
      },
    ],
  },
];

@NgModule({
  declarations: [AdministrationConsulatComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationConsulatModule {}
