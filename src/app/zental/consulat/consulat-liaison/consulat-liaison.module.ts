import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatLiaisonComponent } from "./consulat-liaison.component";
import { RouterModule, Routes } from "@angular/router";
import { LiaisonModule } from "../../liaison/liaison.module";
import { LiaisonShowComponent } from "../../liaison/liaison-show/liaison-show.component";

const routes: Routes = [
  {
    path: "",
    component: ConsulatLiaisonComponent,
  },
  {
    path: ":id",
    component: LiaisonShowComponent,
    children: [
      {
        path: "citoyens",
        loadChildren: () =>
          import("./../../liaison/liaison-citoyen/liaison-citoyen.module").then(
            (module) => module.LiaisonCitoyenModule
          ),
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../../liaison/liaison-service/liaison-service.module").then(
            (module) => module.LiaisonServiceModule
          ),
      },
      {
        path: "employes",
        loadChildren: () =>
          import("./../../liaison/liaison-employe/liaison-employe.module").then(
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
  declarations: [ConsulatLiaisonComponent],
  imports: [CommonModule, LiaisonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatLiaisonModule {}
