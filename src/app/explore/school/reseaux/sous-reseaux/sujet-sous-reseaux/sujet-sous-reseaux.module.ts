import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SujetSousReseauxComponent } from "./sujet-sous-reseaux.component";
import { SujetSousReseauxListComponent } from "./sujet-sous-reseaux-list/sujet-sous-reseaux-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../../../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";
import { SujetSousReseauxCreateComponent } from "./sujet-sous-reseaux-create/sujet-sous-reseaux-create.component";
import { SujetSousReseauxShowComponent } from "./sujet-sous-reseaux-show/sujet-sous-reseaux-show.component";
import { ReactionSujetReseauxModule } from "./reaction-sujet-reseaux/reaction-sujet-reseaux.module";

const routes: Routes = [
  {
    path: "",
    component: SujetSousReseauxComponent,
  },
];

@NgModule({
  declarations: [
    SujetSousReseauxComponent,
    SujetSousReseauxListComponent,
    SujetSousReseauxCreateComponent,
    SujetSousReseauxShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    ReactionSujetReseauxModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SujetSousReseauxModule {}
