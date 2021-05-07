import { FormationCreateComponent } from "./formation-create/formation-create.component";
import { FormationComponent } from "./formation.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { FormationListComponent } from "./formation-list/formation-list.component";
import { FormationShowComponent } from "./formation-show/formation-show.component";
import { FormationEditComponent } from "./formation-edit/formation-edit.component";
import { FormationShowDetailsComponent } from "./formation-show/formation-show-details/formation-show-details.component";
import { FormationStatsComponent } from "./formation-stats/formation-stats.component";

const routes: Routes = [
  {
    path: "",
    component: FormationComponent,
    children: [
      {
        path: "stats",
        component: FormationStatsComponent,
      },

      {
        path: ":id",
        component: FormationShowComponent,
        children: [
          {
            path: "",
            component: FormationShowDetailsComponent,
          },
          {
            path: "condition-participation",
            component: FormationShowDetailsComponent,
          },
          {
            path: "objectifs",
            component: FormationShowDetailsComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    FormationComponent,
    FormationListComponent,
    FormationCreateComponent,
    FormationShowComponent,
    FormationEditComponent,
    FormationShowDetailsComponent,
    FormationStatsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormationModule {}
