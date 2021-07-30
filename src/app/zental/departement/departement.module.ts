import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DepartementComponent } from "./departement.component";
import { DepartementListComponent } from "./departement-list/departement-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: DepartementComponent,
  },
];

@NgModule({
  declarations: [DepartementComponent, DepartementListComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DepartementModule {}
