import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationMinistereComponent } from "./administration-ministere.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AdministrationMinistereAmbassadeComponent } from "./administration-ministere-ambassade/administration-ministere-ambassade.component";
import { AmbassadeModule } from "../../ambassade/ambassade.module";
import { AdministrationMinistereConsulatComponent } from "./administration-ministere-consulat/administration-ministere-consulat.component";
import { ConsulatModule } from "../../consulat/consulat.module";

const routes: Routes = [
  {
    path: "",
    component: AdministrationMinistereComponent,
    children: [
      {
        path: "ambassades",
        component: AdministrationMinistereAmbassadeComponent,
      },
      {
        path: "ressources-humaines",
        loadChildren: () =>
          import(
            "../../ministere/ministere-employe/ministere-employe.module"
          ).then((module) => module.MinistereEmployeModule),
      },
      {
        path: "bureaux",
        loadChildren: () =>
          import(
            "./../../ministere/ministere-bureaux/ministere-bureaux.module"
          ).then((module) => module.MinistereBureauxModule),
      },
      {
        path: "departements",
        loadChildren: () =>
          import(
            "./../../ministere/ministere-departement/ministere-departement.module"
          ).then((module) => module.MinistereDepartementModule),
      },
      {
        path: "consulats",
        component: AdministrationMinistereConsulatComponent,
      },
      {
        path: "services",
        loadChildren: () =>
          import(
            "../../ministere/ministere-service/ministere-service.module"
          ).then((module) => module.MinistereServiceModule),
      },
      {
        path: "passerelles",
        loadChildren: () =>
          import(
            "./../../ministere/ministere-passerelle/ministere-passerelle.module"
          ).then((module) => module.MinisterePasserelleModule),
      },
      {
        path: "liaisons",
        loadChildren: () =>
          import(
            "./../../ministere/ministere-liaison/ministere-liaison.module"
          ).then((module) => module.MinistereLiaisonModule),
      },
      {
        path: "domaines",
        loadChildren: () =>
          import(
            "../../ministere/ministere-domaine/ministere-domaine.module"
          ).then((module) => module.MinistereDomaineModule),
      },
      {
        path: "postes",
        loadChildren: () =>
          import("../../ministere/ministere-poste/ministere-poste.module").then(
            (module) => module.MinisterePosteModule
          ),
      },
      {
        path: "fonctions",
        loadChildren: () =>
          import(
            "../../ministere/ministere-fonction/ministere-fonction.module"
          ).then((module) => module.MinistereFonctionModule),
      },
      {
        path: "toloba",
        loadChildren: () =>
          import(
            "../../ministere/ministere-toloba/ministere-toloba.module"
          ).then((module) => module.MinistereTolobaModule),
      },
      {
        path: "**",
        redirectTo: "ambassades",
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdministrationMinistereComponent,
    AdministrationMinistereAmbassadeComponent,
    AdministrationMinistereConsulatComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AmbassadeModule,
    ConsulatModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdministrationMinistereModule {}
