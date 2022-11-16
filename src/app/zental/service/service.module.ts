import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ServiceComponent } from "./service.component";
import { ServiceCreateComponent } from "./service-create/service-create.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { ServiceEditComponent } from "./service-edit/service-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";
import { ServiceShowComponent } from "./service-show/service-show.component";
import { ServiceDescriptionComponent } from "./service-show/service-description/service-description.component";
import { ServiceEmployeComponent } from "./service-show/service-employe/service-employe.component";
import { EmployeModule } from "../employe/employe.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: ServiceComponent,
//   },
// ];

@NgModule({
  declarations: [
    ServiceComponent,
    ServiceCreateComponent,
    ServiceListComponent,
    ServiceEditComponent,
    ServiceShowComponent,
    ServiceDescriptionComponent,
    ServiceEmployeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    EmployeModule,
    // RouterModule.forChild(routes),
  ],
  exports: [ServiceComponent],
})
export class ServiceModule {}
