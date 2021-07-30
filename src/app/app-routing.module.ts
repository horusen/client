import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnexionComponent } from "./authentification/connexion/connexion.component";
import { InscriptionComponent } from "./authentification/inscription/inscription.component";

const routes: Routes = [
  {
    path: "connexion",
    component: ConnexionComponent,
  },
  {
    path: "inscription",
    component: InscriptionComponent,
  },
  {
    path: "",
    loadChildren: () =>
      import("./zental/zental.module").then((module) => module.ZentalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
