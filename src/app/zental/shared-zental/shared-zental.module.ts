import { MotifInscriptionConsulaireComponent } from "./../inscription-consulaire/motif-inscription-consulaire/motif-inscription-consulaire.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainHeaderComponent } from "./component/main-header/main-header.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EntiteDiplomatiqueCreateComponent } from "./abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { EntiteDiplomatiqueEditComponent } from "./abstract/entite-diplomatique-edit/entite-diplomatique-edit.component";
import { PosteCreateComponent } from "../poste/poste-create/poste-create.component";
import { UserModule } from "../user/user.module";
import { IdentiteInformationComponent } from "../identite/identite-information/identite-information.component";
import { AjouterMembreFamilleComponent } from "../identite/ajouter-membre-famille/ajouter-membre-famille.component";
import { MinistereCreateComponent } from "../ministere/ministere-create/ministere-create.component";
import { AmbassadeCreateComponent } from "../ambassade/ambassade-create/ambassade-create.component";
import { ConsulatCreateComponent } from "../consulat/consulat-create/consulat-create.component";
import { BureauCreateComponent } from "../bureau/bureau-create/bureau-create.component";

@NgModule({
  declarations: [
    MainHeaderComponent,
    EntiteDiplomatiqueCreateComponent,
    EntiteDiplomatiqueEditComponent,
    PosteCreateComponent,
    IdentiteInformationComponent,
    AjouterMembreFamilleComponent,
    MotifInscriptionConsulaireComponent,
    MinistereCreateComponent,
    AmbassadeCreateComponent,
    ConsulatCreateComponent,
    BureauCreateComponent,
  ],
  imports: [CommonModule, SharedModule, UserModule],
  exports: [
    MainHeaderComponent,
    PosteCreateComponent,
    UserModule,
    IdentiteInformationComponent,
    AjouterMembreFamilleComponent,
    MotifInscriptionConsulaireComponent,
    MinistereCreateComponent,
    AmbassadeCreateComponent,
    ConsulatCreateComponent,
    BureauCreateComponent,
  ],
})
export class SharedZentalModule {}
