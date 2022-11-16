import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FamilleComponent } from "./famille.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";
import { ConjointComponent } from "./conjoint/conjoint.component";
import { EnfantComponent } from "./enfant/enfant.component";
import { ConjointShowComponent } from "./conjoint/conjoint-show/conjoint-show.component";
import { ConjointCreateComponent } from "./conjoint/conjoint-create/conjoint-create.component";
import { EnfantListComponent } from "./enfant/enfant-list/enfant-list.component";

const routes: Routes = [
  {
    path: "",
    component: FamilleComponent,
  },
];

@NgModule({
  declarations: [
    FamilleComponent,
    ConjointComponent,
    EnfantComponent,
    ConjointShowComponent,
    ConjointCreateComponent,
    EnfantListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class FamilleModule {}
