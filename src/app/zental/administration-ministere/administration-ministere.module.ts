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
          import("./../employe/employe.module").then(
            (module) => module.EmployeModule
          ),
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
          import("./../departement/departement.module").then(
            (module) => module.DepartementModule
          ),
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
          import("./../service/service.module").then(
            (module) => module.ServiceModule
          ),
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
          import("./../domaine/domaine.module").then(
            (module) => module.DomaineModule
          ),
      },
      {
        path: "postes",
        loadChildren: () =>
          import("./../poste/poste.module").then(
            (module) => module.PosteModule
          ),
      },
      {
        path: "fonctions",
        loadChildren: () =>
          import("./../fonction/fonction.module").then(
            (module) => module.FonctionModule
          ),
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
