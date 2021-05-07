import { SharedModule } from "./../../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssetDiscussionComponent } from "../../reaction/asset-discussion/asset-discussion.component";
import { AssetDiscussionFichierComponent } from "../../reaction/asset-discussion/asset-discussion-fichier/asset-discussion-fichier.component";
import { AssetDiscussionGroupeComponent } from "../../reaction/asset-discussion/asset-discussion-groupe/asset-discussion-groupe.component";
import { AssetDiscussionTacheComponent } from "../../reaction/asset-discussion/asset-discussion-tache/asset-discussion-tache.component";
import { AssetDiscussionEtablissementComponent } from "../../reaction/asset-discussion/asset-discussion-etablissement/asset-discussion-etablissement.component";
import { AssetDiscussionEtudiantComponent } from "../../reaction/asset-discussion/asset-discussion-etudiant/asset-discussion-etudiant.component";
import { AssetDiscussionCorrectionComponent } from "../../reaction/asset-discussion/asset-discussion-correction/asset-discussion-correction.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";

@NgModule({
  declarations: [
    AssetDiscussionComponent,
    AssetDiscussionFichierComponent,
    AssetDiscussionGroupeComponent,
    AssetDiscussionTacheComponent,
    AssetDiscussionEtablissementComponent,
    AssetDiscussionEtudiantComponent,
    AssetDiscussionCorrectionComponent,
  ],
  imports: [CommonModule, SharedSchoolModule, SharedModule],
  exports: [AssetDiscussionComponent],
})
export class AssetDiscussionModule {}
