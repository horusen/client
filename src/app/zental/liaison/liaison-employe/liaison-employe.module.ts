import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { EmployeModule } from "./../../employe/employe.module";
import { SharedModule } from "./../../../shared/shared.module";
import { LiaisonEmployesComponent } from "./../liaison-show/liaison-employes/liaison-employes.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: LiaisonEmployesComponent,
  },
];

@NgModule({
  declarations: [LiaisonEmployesComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LiaisonEmployeModule {}
