import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationMinistereComponent } from "./administration-ministere.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AdministrationMinistereComponent,
    children: [
      {
        path: "ambassades",
        loadChildren: () =>
          import("./../ambassade/ambassade.module").then(
            (module) => module.AmbassadeModule
          ),
      },
      {
        path: "ressources-humaines",
        loadChildren: () =>
          import(
            "./../ministere/ministere-employe/ministere-employe.module"
          ).then((module) => module.MinistereEmployeModule),
      },
      {
        path: "bureaux",
        loadChildren: () =>
          import("./../bureau/bureau.module").then(
            (module) => module.BureauModule
          ),
      },
      {
        path: "departements",
        loadChildren: () =>
          import(
            "./../ministere/ministere-departement/ministere-departement.module"
          ).then((module) => module.MinistereDepartementModule),
      },
      {
        path: "consulats",
        loadChildren: () =>
          import("./../consulat/consulat.module").then(
            (module) => module.ConsulatModule
          ),
      },
      {
        path: "services",
        loadChildren: () =>
          import(
            "./../ministere/ministere-service/ministere-service.module"
          ).then((module) => module.MinistereServiceModule),
      },
      {
        path: "passerelles",
        loadChildren: () =>
          import("./../passerelle/passerelle.module").then(
            (module) => module.PasserelleModule
          ),
      },
      {
        path: "liaisons",
        loadChildren: () =>
          import("./../liaison/liaison.module").then(
            (module) => module.LiaisonModule
          ),
      },
      {
        path: "domaines",
        loadChildren: () =>
          import(
            "./../ministere/ministere-domaine/ministere-domaine.module"
          ).then((module) => module.MinistereDomaineModule),
      },
      {
        path: "postes",
        loadChildren: () =>
          import("./../ministere/ministere-poste/ministere-poste.module").then(
            (module) => module.MinisterePosteModule
          ),
      },
      {
        path: "fonctions",
        loadChildren: () =>
          import(
            "./../ministere/ministere-fonction/ministere-fonction.module"
          ).then((module) => module.MinistereFonctionModule),
      },
      {
        path: "**",
        redirectTo: "ambassades",
      },
    ],
  },
];

@NgModule({
  declarations: [AdministrationMinistereComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationMinistereModule {}
