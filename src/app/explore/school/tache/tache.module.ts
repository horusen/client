import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TacheComponent } from "./tache.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { TacheListComponent } from "./tache-list/tache-list.component";
import { FiltreTacheListComponent } from "./tache-list/filtre-tache-list/filtre-tache-list.component";
import { TacheCreateComponent } from "./tache-create/tache-create.component";

const routes: Routes = [
  {
    path: "",
    component: TacheComponent,
    children: [
      {
        path: ":id",
        redirectTo: "tache/:id",
      },
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
  declarations: [
    TacheComponent,
    TacheListComponent,
    FiltreTacheListComponent,
    TacheCreateComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TacheModule {}
