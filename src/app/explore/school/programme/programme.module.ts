import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgrammeComponent } from "./programme.component";
import { ProgrammeListByProfesseurComponent } from "./programme-list-by-professeur/programme-list-by-professeur.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ProgrammeListComponent } from "./programme-list/programme-list.component";
import { ProgrammeCreateComponent } from "./programme-create/programme-create.component";
import { ProgrammeShowComponent } from "./programme-show/programme-show.component";
import { ProgrammedEditComponent } from "./programmed-edit/programmed-edit.component";
import { ProgrammeStatsComponent } from "./programme-stats/programme-stats.component";
import { ProgrammeShowDetailsComponent } from "./programme-show/programme-show-details/programme-show-details.component";
import { ProgrammeShowFormationComponent } from "./programme-show/programme-show-formation/programme-show-formation.component";

const routes: Routes = [
  {
    path: "",
    component: ProgrammeComponent,
    children: [
      // {
      //   path: "",
      //   component: ProgrammeListComponent,
      // },
      {
        path: "stats",
        component: ProgrammeStatsComponent,
      },
      {
        path: ":id",
        component: ProgrammeShowComponent,
        children: [
          {
            path: "",
            component: ProgrammeShowDetailsComponent,
          },
          {
            path: "conditions-admissions",
            component: ProgrammeShowDetailsComponent,
          },
          {
            path: "formation",
            component: ProgrammeShowFormationComponent,
          },
        ],
      },
    ],
  },
  // {
  //   path: ":id",
  //   component: Pr
  // }
];

@NgModule({
  declarations: [
    ProgrammeComponent,
    ProgrammeListByProfesseurComponent,
    ProgrammeListComponent,
    ProgrammeCreateComponent,
    ProgrammeShowComponent,
    ProgrammedEditComponent,
    ProgrammeStatsComponent,
    ProgrammeShowDetailsComponent,
    ProgrammeShowFormationComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammeModule {}
