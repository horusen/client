import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeDepartementComponent } from "./ambassade-departement.component";
import { RouterModule, Routes } from "@angular/router";
import { DepartementModule } from "../../departement/departement.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeDepartementComponent,
  },
];

@NgModule({
  declarations: [AmbassadeDepartementComponent],
  imports: [CommonModule, DepartementModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadeDepartementModule {}
