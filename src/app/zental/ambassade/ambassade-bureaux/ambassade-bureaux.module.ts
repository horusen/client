import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeBureauxComponent } from "./ambassade-bureaux.component";
import { SharedModule } from "src/app/shared/shared.module";
import { BureauModule } from "../../bureau/bureau.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeBureauxComponent,
  },
];

@NgModule({
  declarations: [AmbassadeBureauxComponent],
  imports: [
    CommonModule,
    SharedModule,
    BureauModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AmbassadeBureauxModule {}
