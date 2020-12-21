import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactionSujetReseauxComponent } from "./reaction-sujet-reseaux.component";
import { ReactionSujetReseauxCreateComponent } from "./reaction-sujet-reseaux-create/reaction-sujet-reseaux-create.component";
import { ReactionSujetReseauxListComponent } from "./reaction-sujet-reseaux-list/reaction-sujet-reseaux-list.component";
import { ReactionSujetReseauxSoloComponent } from "./reaction-sujet-reseaux-solo/reaction-sujet-reseaux-solo.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "src/app/explore/school/shared-school/shared-school.module";

@NgModule({
  declarations: [
    ReactionSujetReseauxComponent,
    ReactionSujetReseauxCreateComponent,
    ReactionSujetReseauxListComponent,
    ReactionSujetReseauxSoloComponent,
  ],
  imports: [CommonModule, SharedModule, SharedSchoolModule],
  exports: [ReactionSujetReseauxComponent],
})
export class ReactionSujetReseauxModule {}
