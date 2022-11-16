import { MinistereEmployeComponent } from "./ministere-employe.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { EmployeModule } from "../../employe/employe.module";

const routes: Routes = [
  {
    path: "",
    component: MinistereEmployeComponent,
  },
];

@NgModule({
  declarations: [MinistereEmployeComponent],
  imports: [CommonModule, EmployeModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinistereEmployeModule {}
