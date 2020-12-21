import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MembreSousReseauxComponent } from "./membre-sous-reseaux.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../../../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MembreSousReseauxComponent,
  },
];

@NgModule({
  declarations: [MembreSousReseauxComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MembreSousReseauxModule {}
