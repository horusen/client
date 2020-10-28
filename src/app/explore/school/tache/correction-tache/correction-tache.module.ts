import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CorrectionTacheComponent } from "./correction-tache.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedTacheModuleModule } from "../shared-tache-module/shared-tache-module.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CorrectionTacheCreateComponent } from "./correction-tache-create/correction-tache-create.component";
import { AutresCorrectionsComponent } from "./autres-corrections/autres-corrections.component";

const routes: Routes = [
  {
    path: "",
    component: CorrectionTacheComponent,
  },
  {
    path: ":id",
    component: CorrectionTacheComponent,
  },
];

@NgModule({
  declarations: [
    CorrectionTacheComponent,
    CorrectionTacheCreateComponent,
    AutresCorrectionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedTacheModuleModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CorrectionTacheModule {}
