import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmploieComponent } from "./emploie.component";
import { EmploieCreateComponent } from "./emploie-create/emploie-create.component";
import { EmploieListComponent } from "./emploie-list/emploie-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";
import { EmploieSoloComponent } from './emploie-solo/emploie-solo.component';

const routes: Routes = [
  {
    path: "",
    component: EmploieComponent,
  },
];

@NgModule({
  declarations: [
    EmploieComponent,
    EmploieCreateComponent,
    EmploieListComponent,
    EmploieSoloComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class EmploieModule {}
