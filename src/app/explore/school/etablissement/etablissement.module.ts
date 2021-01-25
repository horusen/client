import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";
import { EtablissementListComponent } from "./etablissement-list/etablissement-list.component";
import { EtablissementShowComponent } from "./etablissement-show/etablissement-show.component";
import { SharedEtablissementModule } from "./shared-etablissement/shared-etablissement.module";
import { EtablissementComponent } from "./etablissement.component";
import { EtablissementListContainerComponent } from "./etablissement-list-container/etablissement-list-container.component";

const routes: Routes = [
  {
    path: "",
    component: EtablissementListContainerComponent,
  },
  {
    path: ":id",
    component: EtablissementShowComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./../employe/employe.module").then(
            (module) => module.EmployeModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    EtablissementComponent,
    EtablissementShowComponent,
    EtablissementListContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SharedEtablissementModule,
  ],
  exports: [RouterModule],
})
export class EtablissementModule {}
