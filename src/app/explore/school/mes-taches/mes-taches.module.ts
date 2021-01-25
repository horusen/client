import { SharedSchoolModule } from "./../shared-school/shared-school.module";
import { SharedTacheModuleModule } from "./../tache/shared-tache-module/shared-tache-module.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MesTachesComponent } from "./mes-taches.component";
import { MesTachesListComponent } from "./mes-taches-list/mes-taches-list.component";
import { MesTachesSoloComponent } from "./mes-taches-list/mes-taches-solo/mes-taches-solo.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AffectationTacheListComponent } from "./mes-taches-list/mes-taches-solo/affectation-tache-list/affectation-tache-list.component";

const routes: Routes = [
  {
    path: "",
    component: MesTachesComponent,
    children: [
      {
        path: "tache",
        loadChildren: () =>
          import("./../tache/tache-show/tache-show.module").then(
            (module) => module.TacheShowModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    MesTachesComponent,
    MesTachesListComponent,
    MesTachesSoloComponent,
    AffectationTacheListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedTacheModuleModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MesTachesModule {}
