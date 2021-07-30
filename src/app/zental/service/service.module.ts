import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServiceComponent } from "./service.component";
import { ServiceCreateComponent } from "./service-create/service-create.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { ServiceEditComponent } from "./service-edit/service-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ServiceComponent,
  },
];

@NgModule({
  declarations: [
    ServiceComponent,
    ServiceCreateComponent,
    ServiceListComponent,
    ServiceEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ServiceModule {}
