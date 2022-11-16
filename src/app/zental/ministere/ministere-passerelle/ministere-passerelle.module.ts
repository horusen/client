import { RouterModule } from "@angular/router";
import { PasserelleModule } from "./../../passerelle/passerelle.module";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinisterePasserelleComponent } from "./ministere-passerelle.component";
import { PasserelleShowComponent } from "../../passerelle/passerelle-show/passerelle-show.component";

const routes: Routes = [
  {
    path: "",
    component: MinisterePasserelleComponent,
  },
  {
    path: ":id",
    component: PasserelleShowComponent,
    children: [
      {
        path: "services",
        loadChildren: () =>
          import(
            "./../../passerelle/passerelle-service/passerelle-service.module"
          ).then((module) => module.PasserelleServiceModule),
      },
      {
        path: "employes",
        loadChildren: () =>
          import(
            "./../../passerelle/passerelle-employe/passerelle-employe.module"
          ).then((module) => module.PasserelleEmployeModule),
      },
      {
        path: "**",
        redirectTo: "services",
      },
    ],
  },
];

@NgModule({
  declarations: [MinisterePasserelleComponent],
  imports: [
    CommonModule,
    SharedModule,
    PasserelleModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MinisterePasserelleModule {}
