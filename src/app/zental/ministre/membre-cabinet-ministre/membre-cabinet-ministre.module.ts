import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MembreCabinetMinistreCreateComponent } from "./membre-cabinet-ministre-create/membre-cabinet-ministre-create.component";
import { MembreCabinetMinistreListComponent } from "./membre-cabinet-ministre-list/membre-cabinet-ministre-list.component";
import { MembreCabinetMinistreEditComponent } from "./membre-cabinet-ministre-edit/membre-cabinet-ministre-edit.component";
import { MembreCabinetMinistreComponent } from "./membre-cabinet-ministre.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { PosteModule } from "../../poste/poste.module";
import { FiltreMembreCabinetMinistreComponent } from "./filtre-membre-cabinet-ministre/filtre-membre-cabinet-ministre.component";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: MembreCabinetMinistreComponent,
  },
];

@NgModule({
  declarations: [
    MembreCabinetMinistreCreateComponent,
    MembreCabinetMinistreListComponent,
    MembreCabinetMinistreEditComponent,
    MembreCabinetMinistreComponent,
    FiltreMembreCabinetMinistreComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MembreCabinetMinistreModule {}
