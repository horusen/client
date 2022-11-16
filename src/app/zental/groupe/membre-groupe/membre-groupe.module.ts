import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MembreGroupeComponent } from "./membre-groupe.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";
import { MembreGroupeListComponent } from './membre-groupe-list/membre-groupe-list.component';
import { MembreGroupeAddComponent } from './membre-groupe-add/membre-groupe-add.component';

const routes: Routes = [
  {
    path: "",
    component: MembreGroupeComponent,
  },
];

@NgModule({
  declarations: [MembreGroupeComponent, MembreGroupeListComponent, MembreGroupeAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MembreGroupeModule {}
