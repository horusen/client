import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LiaisonComponent } from "./liaison.component";
import { LiaisonCreateComponent } from "./liaison-create/liaison-create.component";
import { LiaisonListComponent } from "./liaison-list/liaison-list.component";
import { LiaisonEditComponent } from "./liaison-edit/liaison-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: LiaisonComponent,
  },
];

@NgModule({
  declarations: [
    LiaisonComponent,
    LiaisonCreateComponent,
    LiaisonListComponent,
    LiaisonEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LiaisonModule {}
