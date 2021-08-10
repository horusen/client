import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilAmbassadeComponent } from "./profil-ambassade.component";
import { RouterModule, Routes } from "@angular/router";
import { AmbassadeDetailsComponent } from "../ambassade-show/ambassade-details/ambassade-details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AdresseModule } from "../../adresse/adresse.module";
import { ComposantDescriptionModule } from "../../composant-description/composant-description.module";

const routes: Routes = [
  {
    path: "",
    component: ProfilAmbassadeComponent,
    children: [
      {
        path: "",
        component: AmbassadeDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ProfilAmbassadeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AdresseModule,
    ComposantDescriptionModule,
  ],
  exports: [RouterModule],
})
export class ProfilAmbassadeModule {}
