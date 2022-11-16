import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdresseComponent } from "./adresse.component";
import { AdresseCreateComponent } from "./adresse-create/adresse-create.component";
import { AdresseEditComponent } from "./adresse-edit/adresse-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AdresseSoloComponent } from "./adresse-solo/adresse-solo.component";

@NgModule({
  declarations: [
    AdresseComponent,
    AdresseCreateComponent,
    AdresseEditComponent,
    AdresseSoloComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    AdresseCreateComponent,
    AdresseEditComponent,
    AdresseSoloComponent,
    AdresseComponent,
  ],
})
export class AdresseModule {}
