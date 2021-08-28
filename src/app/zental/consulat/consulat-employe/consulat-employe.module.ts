import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatEmployeComponent } from "./consulat-employe.component";
import { RouterModule, Routes } from "@angular/router";
import { EmployeModule } from "../../employe/employe.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatEmployeComponent,
  },
];

@NgModule({
  declarations: [ConsulatEmployeComponent],
  imports: [CommonModule, EmployeModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatEmployeModule {}
