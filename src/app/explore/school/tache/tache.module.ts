import { MesTachesModule } from "./../mes-taches/mes-taches.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TacheComponent } from "./tache.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { TacheListComponent } from "./tache-list/tache-list.component";
import { TacheCreateComponent } from "./tache-create/tache-create.component";
import { SharedTacheModuleModule } from "./shared-tache-module/shared-tache-module.module";
import { SolutionTacheModule } from "./solution-tache/solution-tache.module";
import { TunelModule } from "./tunel/tunel.module";

const routes: Routes = [
  {
    path: "",
    component: TacheComponent,
    children: [
      {
        path: "tache",
        loadChildren: () =>
          import("./tache-show/tache-show.module").then(
            (module) => module.TacheShowModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [TacheComponent, TacheListComponent, TacheCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    TunelModule,
    MesTachesModule,
    SolutionTacheModule,
    SharedTacheModuleModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TacheModule {}
