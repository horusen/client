import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResolutionTacheComponent } from "./resolution-tache.component";
import { TacheDetailsMinComponent } from "./tache-details-min/tache-details-min.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { TacheDetailsInfoMinComponent } from "./tache-details-min/tache-details-info-min/tache-details-info-min.component";
import { ProfesseurTacheListComponent } from "./tache-details-min/professeur-tache-list/professeur-tache-list.component";
import { GroupeTacheListMinComponent } from "./tache-details-min/groupe-tache-list-min/groupe-tache-list-min.component";
import { ImageViewerModule } from "src/app/shared/image-viewer/image-viewer.module";
import { SharedTacheModuleModule } from "../../shared-tache-module/shared-tache-module.module";

const routes: Routes = [
  {
    path: "",
    component: ResolutionTacheComponent,
    children: [
      {
        path: "",
        redirectTo: "messenger",
      },
      {
        path: "messenger",
        loadChildren: () =>
          import(
            "./reaction-mode-messenger/reaction-mode-messenger.module"
          ).then((module) => module.ReactionModeMessengerModule),
      },
      {
        path: "commentaire",
        loadChildren: () =>
          import(
            "./reaction-mode-commentaire/reaction-mode-commentaire.module"
          ).then((module) => module.ReactionModeCommentaireModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    ResolutionTacheComponent,
    TacheDetailsMinComponent,
    TacheDetailsInfoMinComponent,
    ProfesseurTacheListComponent,
    GroupeTacheListMinComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedTacheModuleModule,
    ImageViewerModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ResolutionTacheModule {}
