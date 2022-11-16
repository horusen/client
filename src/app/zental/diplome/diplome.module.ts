import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiplomeComponent } from "./diplome.component";
import { DiplomeCreateComponent } from "./diplome-create/diplome-create.component";
import { DiplomeListComponent } from "./diplome-list/diplome-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";
import { DiplomeSoloComponent } from './diplome-solo/diplome-solo.component';

const routes: Routes = [
  {
    path: "",
    component: DiplomeComponent,
  },
];

@NgModule({
  declarations: [
    DiplomeComponent,
    DiplomeCreateComponent,
    DiplomeListComponent,
    DiplomeSoloComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DiplomeModule {}
