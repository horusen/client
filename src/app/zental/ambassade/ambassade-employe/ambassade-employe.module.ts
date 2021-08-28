import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeEmployeComponent } from "./ambassade-employe.component";
import { RouterModule, Routes } from "@angular/router";
import { EmployeModule } from "../../employe/employe.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeEmployeComponent,
  },
];

@NgModule({
  declarations: [AmbassadeEmployeComponent],
  imports: [CommonModule, EmployeModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadeEmployeModule {}
