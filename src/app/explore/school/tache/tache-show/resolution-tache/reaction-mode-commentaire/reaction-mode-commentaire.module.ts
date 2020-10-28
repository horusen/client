import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactionModeCommentaireComponent } from "./reaction-mode-commentaire.component";
import { ReactionModeCommentaireListComponent } from "./reaction-mode-commentaire-list/reaction-mode-commentaire-list.component";
import { ReactionModeCommentaireSoloComponent } from "./reaction-mode-commentaire-list/reaction-mode-commentaire-solo/reaction-mode-commentaire-solo.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedTacheModuleModule } from "../../../shared-tache-module/shared-tache-module.module";
import { ReactionModeCommentaireCreateComponent } from './reaction-mode-commentaire-list/reaction-mode-commentaire-create/reaction-mode-commentaire-create.component';

const routes: Routes = [
  {
    path: "",
    component: ReactionModeCommentaireComponent,
  },
];

@NgModule({
  declarations: [
    ReactionModeCommentaireComponent,
    ReactionModeCommentaireListComponent,
    ReactionModeCommentaireSoloComponent,
    ReactionModeCommentaireCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedTacheModuleModule,
    RouterModule.forChild(routes),
  ],
})
export class ReactionModeCommentaireModule {}
