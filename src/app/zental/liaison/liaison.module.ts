import { InscriptionConsulaireModule } from "./../inscription-consulaire/inscription-consulaire.module";
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
import { AffecterLiaisonComponent } from "./affecter-liaison/affecter-liaison.component";
import { EmployeModule } from "../employe/employe.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: LiaisonComponent,
//   },
//   {
//     path: ":id",
//     component: LiaisonShowComponent,
//     children: [
//       { path: "", component: LiaisonDescriptionComponent },
//       { path: "employes", component: LiaisonEmployesComponent },
//     ],
//   },
// ];

@NgModule({
  declarations: [
    LiaisonComponent,
    LiaisonCreateComponent,
    LiaisonListComponent,
    LiaisonEditComponent,
    LiaisonShowComponent,
    LiaisonDescriptionComponent,
    AffecterLiaisonComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    InscriptionConsulaireModule,
    // RouterModule.forChild(routes),
  ],
  exports: [LiaisonComponent],
})
export class LiaisonModule {}
