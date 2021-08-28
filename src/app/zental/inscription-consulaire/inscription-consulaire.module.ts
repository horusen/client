import { IdentiteMinModule } from "./../identite/identite-min/identite-min.module";
import { SharedZentalModule } from "./../shared-zental/shared-zental.module";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InscriptionConsulaireComponent } from "./inscription-consulaire.component";
import { InscriptionConsulaireCreateComponent } from "./inscription-consulaire-create/inscription-consulaire-create.component";
import { InscriptionConsulaireListComponent } from "./inscription-consulaire-list/inscription-consulaire-list.component";
import { InscriptionConsulaireShowComponent } from "./inscription-consulaire-show/inscription-consulaire-show.component";

@NgModule({
  declarations: [
    InscriptionConsulaireComponent,
    InscriptionConsulaireCreateComponent,
    InscriptionConsulaireListComponent,
    InscriptionConsulaireShowComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule, IdentiteMinModule],
  exports: [
    InscriptionConsulaireCreateComponent,
    InscriptionConsulaireComponent,
  ],
})
export class InscriptionConsulaireModule {}
