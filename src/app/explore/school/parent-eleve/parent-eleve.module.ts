import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ParentEleveComponent } from "./parent-eleve.component";
import { ParentEleveListByEtablissementComponent } from "./parent-eleve-list-by-etablissement/parent-eleve-list-by-etablissement.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ParentEleveAddComponent } from "./parent-eleve-add/parent-eleve-add.component";
import { ParentEleveStatsComponent } from "./parent-eleve-stats/parent-eleve-stats.component";
import { ParentEleveShowComponent } from "./parent-eleve-show/parent-eleve-show.component";
import { ParentEleveShowDetailsComponent } from "./parent-eleve-show/parent-eleve-show-details/parent-eleve-show-details.component";
import { ParentEleveShowEleveComponent } from "./parent-eleve-show/parent-eleve-show-eleve/parent-eleve-show-eleve.component";

const routes: Routes = [
  {
    path: "",
    component: ParentEleveComponent,
    children: [
      { path: "statistiques", component: ParentEleveStatsComponent },
      {
        path: ":id",
        component: ParentEleveShowComponent,
        children: [
          { path: "", component: ParentEleveShowDetailsComponent },
          { path: "tutelle", component: ParentEleveShowEleveComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ParentEleveComponent,
    ParentEleveListByEtablissementComponent,
    ParentEleveAddComponent,
    ParentEleveStatsComponent,
    ParentEleveShowComponent,
    ParentEleveShowDetailsComponent,
    ParentEleveShowEleveComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentEleveModule {}
