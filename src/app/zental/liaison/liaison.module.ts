import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LiaisonComponent } from "./liaison.component";
import { LiaisonCreateComponent } from "./liaison-create/liaison-create.component";
import { LiaisonListComponent } from "./liaison-list/liaison-list.component";
import { LiaisonEditComponent } from "./liaison-edit/liaison-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { LiaisonShowComponent } from "./liaison-show/liaison-show.component";
import { LiaisonDescriptionComponent } from "./liaison-show/liaison-description/liaison-description.component";
import { LiaisonEmployesComponent } from "./liaison-show/liaison-employes/liaison-employes.component";
import { AffecterLiaisonComponent } from "./affecter-liaison/affecter-liaison.component";
import { EmployeModule } from "../employe/employe.module";

const routes: Routes = [
  {
    path: "",
    component: LiaisonComponent,
  },
  {
    path: ":id",
    component: LiaisonShowComponent,
    children: [
      { path: "", component: LiaisonDescriptionComponent },
      { path: "employes", component: LiaisonEmployesComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LiaisonComponent,
    LiaisonCreateComponent,
    LiaisonListComponent,
    LiaisonEditComponent,
    LiaisonShowComponent,
    LiaisonDescriptionComponent,
    LiaisonEmployesComponent,
    AffecterLiaisonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LiaisonModule {}
