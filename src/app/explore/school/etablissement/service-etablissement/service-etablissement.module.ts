import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ServiceEtablissementComponent } from "./service-etablissement.component";
import { ServiceEtablissementListComponent } from "./service-etablissement-list/service-etablissement-list.component";
import { ServiceEtablissementCreateComponent } from "./service-etablissement-create/service-etablissement-create.component";
import { ServiceEtablissementShowComponent } from "./service-etablissement-show/service-etablissement-show.component";
import { ServiceEtablissementEditComponent } from "./service-etablissement-edit/service-etablissement-edit.component";
import { ServiceEtablissementShowDetailsComponent } from "./service-etablissement-show/service-etablissement-show-details/service-etablissement-show-details.component";
import { ServiceEtablissementStatsComponent } from "./service-etablissement-stats/service-etablissement-stats.component";
import { ServiceEtablissementShowEmployeComponent } from "./service-etablissement-show/service-etablissement-show-employe/service-etablissement-show-employe.component";

const routes: Routes = [
  {
    path: "",
    component: ServiceEtablissementComponent,
    children: [
      {
        path: "statistiques",
        component: ServiceEtablissementStatsComponent,
      },
      {
        path: ":id",
        component: ServiceEtablissementShowComponent,
        children: [
          {
            path: "",
            component: ServiceEtablissementShowDetailsComponent,
          },
          {
            path: "employe",
            component: ServiceEtablissementShowEmployeComponent,
          },
        ],
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
    ServiceEtablissementShowDetailsComponent,
    ServiceEtablissementStatsComponent,
    ServiceEtablissementShowEmployeComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceEtablissementModule {}
