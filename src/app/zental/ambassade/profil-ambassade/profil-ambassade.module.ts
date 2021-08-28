import { AmbassadeModule } from "./../ambassade.module";
import { DescriptionPartielAmbassadeComponent } from "./../description-partiel-ambassade/description-partiel-ambassade.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilAmbassadeComponent } from "./profil-ambassade.component";
import { RouterModule, Routes } from "@angular/router";
import { AmbassadeDetailsComponent } from "../ambassade-show/ambassade-details/ambassade-details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AdresseModule } from "../../adresse/adresse.module";
import { ComposantDescriptionModule } from "../../composant-description/composant-description.module";
import { InstitutionModule } from "../../institution/institution.module";
import { AmbassadeIciMonPaysComponent } from "./ambassade-ici-mon-pays/ambassade-ici-mon-pays.component";
import { IciMonPaysModule } from "./../../ici-mon-pays/ici-mon-pays.module";

const routes: Routes = [
  {
    path: "",
    component: ProfilAmbassadeComponent,
    children: [
      {
        path: "",
        component: AmbassadeDetailsComponent,
      },
      {
        path: "ambassadeurs",
        loadChildren: () =>
          import("./../ambassadeur/ambassadeur.module").then(
            (module) => module.AmbassadeurModule
          ),
      },
      {
        path: "missions",
        component: DescriptionPartielAmbassadeComponent,
      },
      {
        path: "organisations",
        component: DescriptionPartielAmbassadeComponent,
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../ambassade-service/ambassade-service.module").then(
            (module) => module.AmbassadeServiceModule
          ),
      },
      {
        path: "consulats",
        loadChildren: () =>
          import("./../ambassade-consulat/ambassade-consulat.module").then(
            (module) => module.AmbassadeConsulatModule
          ),
      },
      {
        path: "ici-mon-pays",
        loadChildren: () =>
          import("./../../ici-mon-pays/ici-mon-pays.module").then(
            (module) => module.IciMonPaysModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ProfilAmbassadeComponent, AmbassadeIciMonPaysComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AdresseModule,
    ComposantDescriptionModule,
    InstitutionModule,
    AmbassadeModule,
  ],
  exports: [RouterModule],
})
export class ProfilAmbassadeModule {}
