import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeConsulatComponent } from "./ambassade-consulat.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ConsulatModule } from "../../consulat/consulat.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeConsulatComponent,
  },
];

@NgModule({
  declarations: [AmbassadeConsulatComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConsulatModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AmbassadeConsulatModule {}
