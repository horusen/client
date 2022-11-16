import { CitoyenModule } from "./../../citoyen/citoyen.module";
import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LiaisonCitoyenComponent } from "./liaison-citoyen.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: LiaisonCitoyenComponent,
  },
];

@NgModule({
  declarations: [LiaisonCitoyenComponent],
  imports: [
    CommonModule,
    SharedModule,
    CitoyenModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LiaisonCitoyenModule {}
