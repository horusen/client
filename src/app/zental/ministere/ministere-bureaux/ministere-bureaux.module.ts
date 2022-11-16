import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { BureauModule } from "./../../bureau/bureau.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereBureauxComponent } from "./ministere-bureaux.component";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: MinistereBureauxComponent,
  },
];

@NgModule({
  declarations: [MinistereBureauxComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    BureauModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MinistereBureauxModule {}
