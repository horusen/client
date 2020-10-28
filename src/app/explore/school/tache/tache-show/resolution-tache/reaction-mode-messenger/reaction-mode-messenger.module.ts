import { ImageViewerModule } from "./../../../../../../shared/image-viewer/image-viewer.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactionModeMessengerComponent } from "./reaction-mode-messenger.component";
import { ReactionModeMessengerListComponent } from "./reaction-mode-messenger-list/reaction-mode-messenger-list.component";
import { ReactionModeMessengerSoloComponent } from "./reaction-mode-messenger-solo/reaction-mode-messenger-solo.component";
import { ReactionModeMessengerCreateComponent } from "./reaction-mode-messenger-create/reaction-mode-messenger-create.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedTacheModuleModule } from "../../../shared-tache-module/shared-tache-module.module";

const routes: Routes = [
  {
    path: "",
    component: ReactionModeMessengerComponent,
  },
];

@NgModule({
  declarations: [
    ReactionModeMessengerComponent,
    ReactionModeMessengerListComponent,
    ReactionModeMessengerSoloComponent,
    ReactionModeMessengerCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImageViewerModule,
    SharedTacheModuleModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ReactionModeMessengerModule {}
