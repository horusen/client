import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FonctionComponent } from "./fonction.component";
import { FonctionListComponent } from "./fonction-list/fonction-list.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: FonctionComponent,
  },
];

@NgModule({
  declarations: [FonctionComponent, FonctionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class FonctionModule {}
