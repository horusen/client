import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarExploreSchoolComponent } from "./sidebar-explore-school.component";
import { SharedModule } from "src/app/shared/shared.module";

import { TableauxComponent } from "./tableaux/tableaux.component";
import { NiveauDifficulteClasseComponent } from "./tableaux/niveau-difficulte-classe/niveau-difficulte-classe.component";
import { MotCleClasseComponent } from "./tableaux/mot-cle-classe/mot-cle-classe.component";
import { DomaineClasseListComponent } from "./tableaux/domaine-classe-list/domaine-classe-list.component";
import { DomaineClasseSoloComponent } from "./tableaux/domaine-classe-list/domaine-classe-solo/domaine-classe-solo.component";
import { SousDomaineClasseListComponent } from "./tableaux/domaine-classe-list/domaine-classe-solo/sous-domaine-classe-list/sous-domaine-classe-list.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";

@NgModule({
  declarations: [
    SidebarExploreSchoolComponent,
    DomaineClasseListComponent,
    DomaineClasseSoloComponent,
    SousDomaineClasseListComponent,
    NiveauDifficulteClasseComponent,
    MotCleClasseComponent,
    TableauxComponent,
  ],
  imports: [CommonModule, SharedModule, SharedSchoolModule],
  exports: [SidebarExploreSchoolComponent],
})
export class SidebarExploreSchoolModule {}
