import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CitoyenComponent } from "./citoyen.component";
import { EmployeModule } from "../employe/employe.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { CitoyenListComponent } from './citoyen-list/citoyen-list.component';

@NgModule({
  declarations: [CitoyenComponent, CitoyenListComponent],
  imports: [CommonModule, SharedModule, EmployeModule, SharedZentalModule],
  exports: [CitoyenComponent],
})
export class CitoyenModule {}
