import { RouterModule } from "@angular/router";
import { EmployeModule } from "./../../employe/employe.module";
import { SharedModule } from "./../../../shared/shared.module";
import { PasserelleEmployesComponent } from "./../passerelle-employes/passerelle-employes.component";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: PasserelleEmployesComponent,
  },
];

@NgModule({
  declarations: [PasserelleEmployesComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PasserelleEmployeModule {}
