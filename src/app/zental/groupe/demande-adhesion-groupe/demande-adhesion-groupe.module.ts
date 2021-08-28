import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemandeAdhesionGroupeComponent } from "./demande-adhesion-groupe.component";
import { DemandeAdhesionGroupeSoloComponent } from "./demande-adhesion-groupe-solo/demande-adhesion-groupe-solo.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: DemandeAdhesionGroupeComponent,
  },
];

@NgModule({
  declarations: [
    DemandeAdhesionGroupeComponent,
    DemandeAdhesionGroupeSoloComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DemandeAdhesionGroupeModule {}
