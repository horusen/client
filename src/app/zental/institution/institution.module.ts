import { ComposantDescriptionModule } from "./../composant-description/composant-description.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InstitutionComponent } from "./institution.component";
import { ProfilInstitutionComponent } from "./profil-institution/profil-institution.component";
import { AdministrationInstitutionComponent } from "./administration-institution/administration-institution.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { AdresseModule } from "../adresse/adresse.module";
import { InstitutionDetailsComponent } from "./institution-details/institution-details.component";
import { DescriptionPartielComponent } from './profil-institution/description-partiel/description-partiel.component';

@NgModule({
  declarations: [
    InstitutionComponent,
    ProfilInstitutionComponent,
    AdministrationInstitutionComponent,
    InstitutionDetailsComponent,
    DescriptionPartielComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdresseModule,
    SharedZentalModule,
    ComposantDescriptionModule,
  ],
  exports: [
    InstitutionComponent,
    ProfilInstitutionComponent,
    AdministrationInstitutionComponent,
    InstitutionDetailsComponent,
  ],
})
export class InstitutionModule {}
