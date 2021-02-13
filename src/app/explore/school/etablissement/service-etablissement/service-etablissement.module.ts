import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ServiceEtablissementComponent } from "./service-etablissement.component";
import { ServiceEtablissementListComponent } from "./service-etablissement-list/service-etablissement-list.component";
import { ServiceEtablissementCreateComponent } from "./service-etablissement-create/service-etablissement-create.component";
import { ServiceEtablissementShowComponent } from "./service-etablissement-show/service-etablissement-show.component";
import { ServiceEtablissementEditComponent } from './service-etablissement-edit/service-etablissement-edit.component';

const routes: Routes = [
  {
    path: "",
    component: ServiceEtablissementComponent,
  },
  {
    path: ":id",
    component: ServiceEtablissementShowComponent,
    children: [
      {
        path: "employe",
        loadChildren: () =>
          import("./../../employe/employe.module").then(
            (module) => module.EmployeModule
          ),
      },
      {
        path: "",
        redirectTo: "employe",
      },
    ],
  },
];

@NgModule({
  declarations: [
    ServiceEtablissementComponent,
    ServiceEtablissementListComponent,
    ServiceEtablissementCreateComponent,
    ServiceEtablissementShowComponent,
    ServiceEtablissementEditComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceEtablissementModule {}
