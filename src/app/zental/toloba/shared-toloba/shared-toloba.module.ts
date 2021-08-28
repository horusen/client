import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeftSideMenuComponent } from "../toloba/left-side-menu/left-side-menu.component";
import { SharedModule } from "src/app/shared/shared.module";
import { VotreDiasporaComponent } from "../toloba/left-side-menu/votre-diaspora/votre-diaspora.component";
import { VosServicesConsulairesComponent } from "../toloba/left-side-menu/vos-services-consulaires/vos-services-consulaires.component";
import { VotreDiplomatieComponent } from "../toloba/left-side-menu/votre-diplomatie/votre-diplomatie.component";
import { DiplomatieAilleursComponent } from "../toloba/left-side-menu/diplomatie-ailleurs/diplomatie-ailleurs.component";
import { VosGroupesComponent } from "../toloba/left-side-menu/vos-groupes/vos-groupes.component";
import { VosGroupesSoloComponent } from "../toloba/left-side-menu/vos-groupes/vos-groupes-solo/vos-groupes-solo.component";

@NgModule({
  declarations: [
    LeftSideMenuComponent,
    VotreDiasporaComponent,
    VosServicesConsulairesComponent,
    VotreDiplomatieComponent,
    DiplomatieAilleursComponent,
    VosGroupesComponent,
    VosGroupesSoloComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [LeftSideMenuComponent],
})
export class SharedTolobaModule {}
