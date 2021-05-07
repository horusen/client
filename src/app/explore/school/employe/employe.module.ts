import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeComponent } from "./employe.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EmployeListByEtablissementComponent } from "./employe-list-by-etablissement/employe-list-by-etablissement.component";
import { EmployeCreateComponent } from "./employe-create/employe-create.component";
import { Routes } from "@angular/router";
import { EmployeListByTypeEtablissementComponent } from "./employe-list-by-type-etablissement/employe-list-by-type-etablissement.component";
import { EmloyeEditComponent } from "./emloye-edit/emloye-edit.component";
import { EmployeStatsComponent } from "./employe-stats/employe-stats.component";
import { EmployeShowComponent } from "./employe-show/employe-show.component";

const routes: Routes = [
  {
    path: "",
    component: EmployeComponent,
    children: [
      {
        path: "statistiques",
        component: EmployeStatsComponent,
      },
      {
        path: ":id",
        component: EmployeShowComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    EmployeComponent,
    EmployeListByEtablissementComponent,
    EmployeCreateComponent,
    EmployeListByTypeEtablissementComponent,
    EmloyeEditComponent,
    EmployeStatsComponent,
    EmployeShowComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeModule {}
