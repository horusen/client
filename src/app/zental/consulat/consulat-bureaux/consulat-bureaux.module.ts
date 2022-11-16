import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatBureauxComponent } from "./consulat-bureaux.component";
import { BureauModule } from "../../bureau/bureau.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatBureauxComponent,
  },
];

@NgModule({
  declarations: [ConsulatBureauxComponent],
  imports: [CommonModule, BureauModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatBureauxModule {}
