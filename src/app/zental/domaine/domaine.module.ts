import { DepartementModule } from "./../departement/departement.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomaineComponent } from "./domaine.component";
import { DomaineListComponent } from "./domaine-list/domaine-list.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { DomaineShowComponent } from "./domaine-show/domaine-show.component";
import { DomaineDescriptionComponent } from "./domaine-show/domaine-description/domaine-description.component";
import { DomaineDepartementComponent } from "./domaine-show/domaine-departement/domaine-departement.component";
import { DomaineServiceComponent } from "./domaine-show/domaine-service/domaine-service.component";
import { DomaineEmployeComponent } from "./domaine-show/domaine-employe/domaine-employe.component";
import { ServiceModule } from "../service/service.module";
import { EmployeModule } from "../employe/employe.module";

@NgModule({
  declarations: [
    DomaineComponent,
    DomaineListComponent,
    DomaineShowComponent,
    DomaineDescriptionComponent,
    DomaineDepartementComponent,
    DomaineServiceComponent,
    DomaineEmployeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    DepartementModule,
    ServiceModule,
    EmployeModule,
  ],
  exports: [DomaineComponent],
})
export class DomaineModule {}
