import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AffectationTacheComponent } from "./affectation-tache.component";
import { AffectationTacheListComponent } from "./affectation-tache-list/affectation-tache-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { SharedTacheModuleModule } from "../shared-tache-module/shared-tache-module.module";
import { AffectationTacheCreateComponent } from "./affectation-tache-create/affectation-tache-create.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: "",
    component: AffectationTacheComponent,
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
  declarations: [
    AffectationTacheComponent,
    AffectationTacheListComponent,
    AffectationTacheCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedSchoolModule,
    SharedModule,
    SharedTacheModuleModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AffectationTacheModule {}
