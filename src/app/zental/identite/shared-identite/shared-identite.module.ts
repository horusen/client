import { SharedZentalModule } from "./../../shared-zental/shared-zental.module";
import { UserInformationComponent } from "./../user-information/user-information.component";
import { InformationMembreFamilleComponent } from "./../information-membre-famille/information-membre-famille.component";
import { CiviliteComponent } from "./../civilite/civilite.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    CiviliteComponent,
    InformationMembreFamilleComponent,
    UserInformationComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule],
  exports: [CiviliteComponent],
})
export class SharedIdentiteModule {}
