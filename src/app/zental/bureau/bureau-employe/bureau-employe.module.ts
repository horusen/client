import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauEmployeComponent } from "./bureau-employe.component";
import { RouterModule, Routes } from "@angular/router";
import { EmployeModule } from "../../employe/employe.module";

const routes: Routes = [
  {
    path: "",
    component: BureauEmployeComponent,
  },
];

@NgModule({
  declarations: [BureauEmployeComponent],
  imports: [CommonModule, EmployeModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BureauEmployeModule {}
