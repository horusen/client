import { ConsulatModule } from "./../consulat.module";
import { ConsulatDetailsComponent } from "./../consulat-details/consulat-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilConsulatComponent } from "./profil-consulat.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AdresseModule } from "../../adresse/adresse.module";
import { ComposantDescriptionModule } from "../../composant-description/composant-description.module";
import { InstitutionModule } from "../../institution/institution.module";
import { DescriptionPartielConsulatComponent } from "./description-partiel-consulat/description-partiel-consulat.component";
import { ConsulatIciMonPaysComponent } from "./consulat-ici-mon-pays/consulat-ici-mon-pays.component";
import { IciMonPaysModule } from "../../ici-mon-pays/ici-mon-pays.module";

const routes: Routes = [
  {
    path: "",
    component: ProfilConsulatComponent,
    children: [
      {
        path: "",
        component: ConsulatDetailsComponent,
      },
      {
        path: "consuls",
        loadChildren: () =>
          import("./../consul/consul.module").then(
            (module) => module.ConsulModule
          ),
      },
      {
        path: "missions",
        component: DescriptionPartielConsulatComponent,
      },
      {
        path: "organisations",
        component: DescriptionPartielConsulatComponent,
      },
      {
        path: "services",
        loadChildren: () =>
          import("./../consulat-service/consulat-service.module").then(
            (module) => module.ConsulatServiceModule
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
  declarations: [
    ProfilConsulatComponent,
    DescriptionPartielConsulatComponent,
    ConsulatIciMonPaysComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AdresseModule,
    ComposantDescriptionModule,
    InstitutionModule,
    ConsulatModule,
  ],
  exports: [RouterModule],
})
export class ProfilConsulatModule {}
