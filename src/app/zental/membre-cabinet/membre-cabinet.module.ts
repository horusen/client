import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MembreCabinetComponent } from "./membre-cabinet.component";
import { MembreCabinetListComponent } from "./membre-cabinet-list/membre-cabinet-list.component";
import { MembreCabinetCreateComponent } from "./membre-cabinet-create/membre-cabinet-create.component";
import { MembreCabinetEditComponent } from "./membre-cabinet-edit/membre-cabinet-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MembreCabinetComponent,
  },
];

@NgModule({
  declarations: [
    MembreCabinetComponent,
    MembreCabinetListComponent,
    MembreCabinetCreateComponent,
    MembreCabinetEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
})
export class MembreCabinetModule {}
