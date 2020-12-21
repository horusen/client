import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuivieTacheListComponent } from "./suivie-tache-list/suivie-tache-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedTacheModuleModule } from "../shared-tache-module/shared-tache-module.module";
import { SuivieTacheComponent } from "./suivie-tache.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SuivieTacheComponent,
    children: [
      {
        path: "tache",
        loadChildren: () =>
          import("./../tache-show/tache-show.module").then(
            (module) => module.TacheShowModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [SuivieTacheComponent, SuivieTacheListComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedTacheModuleModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SuivieTacheModule {}
