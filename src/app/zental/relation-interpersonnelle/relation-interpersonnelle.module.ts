import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RelationInterpersonnelleComponent } from "./relation-interpersonnelle.component";
import { RelationInterpersonnelleListComponent } from "./relation-interpersonnelle-list/relation-interpersonnelle-list.component";
import { RelationInterpersonnelleCreateComponent } from "./relation-interpersonnelle-create/relation-interpersonnelle-create.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: RelationInterpersonnelleComponent,
  },
];

@NgModule({
  declarations: [
    RelationInterpersonnelleComponent,
    RelationInterpersonnelleListComponent,
    RelationInterpersonnelleCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RelationInterpersonnelleModule {}
