import { CitoyenModule } from "./../../citoyen/citoyen.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauCitoyenComponent } from "./bureau-citoyen.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: BureauCitoyenComponent,
  },
];

@NgModule({
  declarations: [BureauCitoyenComponent],
  imports: [
    CommonModule,
    SharedModule,
    CitoyenModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class BureauCitoyenModule {}
