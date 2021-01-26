import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TypeEtablissementComponent } from "./type-etablissement.component";
import { TypeEtablissementListComponent } from "./type-etablissement-list/type-etablissement-list.component";
import { TypeEtablissementShowComponent } from "./type-etablissement-show/type-etablissement-show.component";

const routes: Routes = [
  {
    path: "",
    component: TypeEtablissementComponent,
    children: [
      {
        path: "",
        component: TypeEtablissementListComponent,
      },
      // etablissement list
      {
        path: ":id",
        component: TypeEtablissementShowComponent,
        children: [
          {
            path: "etablissement",
            loadChildren: () =>
              import("./../etablissement.module").then(
                (module) => module.EtablissementModule
              ),
          },
          {
            path: "",
            redirectTo: "etablissement",
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    TypeEtablissementComponent,
    TypeEtablissementListComponent,
    TypeEtablissementShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeEtablissementModule {}
