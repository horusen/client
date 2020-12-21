import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { ReseauxShowComponent } from "./reseaux-show/reseaux-show.component";
import { RouterModule, Routes } from "@angular/router";
import { ReseauxComponent } from "./reseaux.component";

const routes: Routes = [
  {
    path: "",
    component: ReseauxComponent,
    children: [
      {
        path: "",
        component: ReseauxShowComponent,
        children: [
          {
            path: "sous-reseau",
            loadChildren: () =>
              import("./sous-reseaux/sous-reseaux.module").then(
                (module) => module.SousReseauxModule
              ),
          },
          {
            path: "",
            redirectTo: "sous-reseau",
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [ReseauxShowComponent, ReseauxComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ReseauxModule {}
