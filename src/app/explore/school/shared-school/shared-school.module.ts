import { DemandeAdhesionGroupeSoloComponent } from "./../groupe/demande-adhesion-groupe/demande-adhesion-groupe-solo/demande-adhesion-groupe-solo.component";
import { DemandeAdhesionGroupeComponent } from "./../groupe/demande-adhesion-groupe/demande-adhesion-groupe.component";
import { FichierSoloComponent } from "./../../../file-manager/fichier/fichier-solo/fichier-solo.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AffecterTacheComponent } from "./affecter-tache/affecter-tache.component";
import { SharedModule } from "src/app/shared/shared.module";
import { PersonalAssetsComponent } from "./personal-assets/personal-assets.component";
// import { TunelModule } from "../tache/tunel/tunel.module";
import { GroupeListMinComponent } from "./groupe-list-min/groupe-list-min.component";
import { ProfesseurListMinComponent } from "./professeur-list-min/professeur-list-min.component";
import { ReseauListMinComponent } from "./reseau-list-min/reseau-list-min.component";
import { ClasseListMinComponent } from "./classe-list-min/classe-list-min.component";
import { DomaineListMinComponent } from "./domaine-list-min/domaine-list-min.component";
import { ReseauxListComponent } from "../reseaux/reseaux-list/reseaux-list.component";
import { SousReseauxListMinComponent } from "./sous-reseaux-list-min/sous-reseaux-list-min.component";
import { MesGroupesIndependantsComponent } from "../groupe/mes-groupes-independants/mes-groupes-independants.component";
import { StatsComponent } from "./stats/stats.component";
import { SidebarCollapseButtonComponent } from "./sidebar-collapse-button/sidebar-collapse-button.component";
import { EleveShowDetailsComponent } from "../eleve/eleve-show/eleve-show-details/eleve-show-details.component";
import { GroupeSoloComponent } from "../groupe/groupe-solo/groupe-solo.component";
import { ChangerPrivilegeMembreGroupeeComponent } from "../groupe/groupe-show/membre-groupe/changer-privilege-membre-groupee/changer-privilege-membre-groupee.component";

@NgModule({
  declarations: [
    AffecterTacheComponent,
    PersonalAssetsComponent,
    ProfesseurListMinComponent,
    ReseauListMinComponent,
    GroupeListMinComponent,
    ClasseListMinComponent,
    DomaineListMinComponent,
    ReseauxListComponent,
    SousReseauxListMinComponent,
    MesGroupesIndependantsComponent,
    StatsComponent,
    SidebarCollapseButtonComponent,
    EleveShowDetailsComponent,
    FichierSoloComponent,
    GroupeSoloComponent,
    ChangerPrivilegeMembreGroupeeComponent,
    DemandeAdhesionGroupeComponent,
    DemandeAdhesionGroupeSoloComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    AffecterTacheComponent,
    GroupeListMinComponent,
    PersonalAssetsComponent,
    ClasseListMinComponent,
    DomaineListMinComponent,
    ReseauxListComponent,
    MesGroupesIndependantsComponent,
    SidebarCollapseButtonComponent,
    EleveShowDetailsComponent,
    FichierSoloComponent,
    GroupeSoloComponent,
    ChangerPrivilegeMembreGroupeeComponent,
    DemandeAdhesionGroupeComponent,
  ],
})
export class SharedSchoolModule {}
