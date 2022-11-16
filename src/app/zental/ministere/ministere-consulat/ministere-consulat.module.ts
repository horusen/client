import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereConsulatComponent } from "./ministere-consulat.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ConsulatModule } from "../../consulat/consulat.module";

const routes: Routes = [
  {
    path: "",
    component: MinistereConsulatComponent,
  },
];

@NgModule({
  declarations: [MinistereConsulatComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConsulatModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MinistereConsulatModule {}
