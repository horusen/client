import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeComponent } from "./employe.component";
import { EmployeListComponent } from "./employe-list/employe-list.component";
import { EmployeCreateComponent } from "./employe-create/employe-create.component";
import { EmployeEditComponent } from "./employe-edit/employe-edit.component";
import { EmployeFilterComponent } from "./employe-filter/employe-filter.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    EmployeComponent,
    EmployeListComponent,
    EmployeCreateComponent,
    EmployeEditComponent,
    EmployeFilterComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule],
  exports: [EmployeComponent],
})
export class EmployeModule {}
