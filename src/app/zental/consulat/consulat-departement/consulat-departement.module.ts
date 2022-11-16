import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatDepartementComponent } from "./consulat-departement.component";
import { RouterModule, Routes } from "@angular/router";
import { DepartementModule } from "../../departement/departement.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatDepartementComponent,
  },
];

@NgModule({
  declarations: [ConsulatDepartementComponent],
  imports: [CommonModule, DepartementModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatDepartementModule {}
