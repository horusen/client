import { AffectationBureauComponent } from "./../bureau-show/affectation-bureau/affectation-bureau.component";
import { InstitutionModule } from "./../../institution/institution.module";
import { AdresseModule } from "./../../adresse/adresse.module";
import { SharedModule } from "src/app/shared/shared.module";
import { BureauDetailsComponent } from "./../bureau-details/bureau-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilBureauComponent } from "./profil-bureau.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ProfilBureauComponent,
    children: [
      {
        path: "",
        component: BureauDetailsComponent,
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../bureau-service/bureau-service.module").then(
            (module) => module.BureauServiceModule
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
        path: "citoyens",
        loadChildren: () =>
          import("./../bureau-citoyen/bureau-citoyen.module").then(
            (module) => module.BureauCitoyenModule
          ),
      },

      // {
      //   path: "ressources-humaines",
      //   loadChildren: () =>
      //     import("./../bureau-employe/bureau-employe.module").then(
      //       (module) => module.BureauEmployeModule
      //     ),
      // },
      // {
      //   path: "consulats",
      //   loadChildren: () =>
      //     import("./../../consulat/consulat.module").then(
      //       (module) => module.ConsulatModule
      //     ),
      // },
      // {
      //   path: "ici-mon-pays",
      //   component: MinistereIciMonPaysComponent,
      // },
    ],
  },
];

@NgModule({
  declarations: [
    ProfilBureauComponent,
    BureauDetailsComponent,
    AffectationBureauComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AdresseModule,
    InstitutionModule,
  ],
  exports: [RouterModule],
})
export class ProfilBureauModule {}
