import { RouterModule } from "@angular/router";
import { SharedModule } from "./../../shared/shared.module";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalLiaisonComponent } from "./zental-liaison.component";
import { LiaisonModule } from "../liaison/liaison.module";
import { LiaisonShowComponent } from "../liaison/liaison-show/liaison-show.component";

const routes: Routes = [
  {
    path: "",
    component: ZentalLiaisonComponent,
  },
  {
    path: ":id",
    component: LiaisonShowComponent,
    children: [
      {
        path: "citoyens",
        loadChildren: () =>
          import("./../liaison/liaison-citoyen/liaison-citoyen.module").then(
            (module) => module.LiaisonCitoyenModule
          ),
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../liaison/liaison-service/liaison-service.module").then(
            (module) => module.LiaisonServiceModule
          ),
      },
      {
        path: "employes",
        loadChildren: () =>
          import("./../liaison/liaison-employe/liaison-employe.module").then(
            (module) => module.LiaisonEmployeModule
          ),
      },
      {
        path: "**",
        redirectTo: "citoyens",
      },
    ],
  },
];

@NgModule({
  declarations: [ZentalLiaisonComponent],
  imports: [
    CommonModule,
    SharedModule,
    LiaisonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ZentalLiaisonModule {}
