import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatComponent } from "./consulat.component";
import { ConsulatCreateComponent } from "./consulat-create/consulat-create.component";
import { ConsulatEditComponent } from "./consulat-edit/consulat-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";
import { ConsulatListComponent } from "./consulat-list/consulat-list.component";

const routes: Routes = [
  {
    path: "",
    component: ConsulatComponent,
  },
];

@NgModule({
  declarations: [
    ConsulatComponent,
    ConsulatCreateComponent,
    ConsulatEditComponent,
    ConsulatListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ConsulatModule {}
