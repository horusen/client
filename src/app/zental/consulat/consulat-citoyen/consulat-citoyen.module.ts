import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CitoyenModule } from "./../../citoyen/citoyen.module";
import { SharedModule } from "./../../../shared/shared.module";
import { ConsulatCitoyenComponent } from "./consulat-citoyen.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: ConsulatCitoyenComponent,
  },
];

@NgModule({
  declarations: [ConsulatCitoyenComponent],
  imports: [
    CommonModule,
    SharedModule,
    CitoyenModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ConsulatCitoyenModule {}
