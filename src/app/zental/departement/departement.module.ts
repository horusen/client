import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DepartementComponent } from "./departement.component";
import { DepartementListComponent } from "./departement-list/departement-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { DepartmentShowComponent } from "./department-show/department-show.component";
import { ServiceModule } from "../service/service.module";
import { DepartementDescriptionComponent } from "./departement-show/departement-description/departement-description.component";
import { DepartementServicesComponent } from "./departement-show/departement-services/departement-services.component";
import { DepartementEmployesComponent } from "./departement-show/departement-employes/departement-employes.component";
import { EmployeModule } from "../employe/employe.module";
import { DepartementCreateComponent } from './departement-create/departement-create.component';
import { DepartementShowComponent } from './departement-show/departement-show.component';

@NgModule({
  declarations: [
    DepartementComponent,
    DepartementListComponent,
    DepartmentShowComponent,
    DepartementDescriptionComponent,
    DepartementServicesComponent,
    DepartementEmployesComponent,
    DepartementCreateComponent,
    DepartementShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    ServiceModule,
    EmployeModule,
  ],
  exports: [DepartementComponent],
})
export class DepartementModule {}
