import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomaineComponent } from "./domaine.component";
import { DomaineListComponent } from "./domaine-list/domaine-list.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: DomaineComponent,
  },
];

@NgModule({
  declarations: [DomaineComponent, DomaineListComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DomaineModule {}
