import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./authentification/auth.guard";
import { ConnexionComponent } from "./authentification/connexion/connexion.component";
import { InscriptionComponent } from "./authentification/inscription/inscription.component";

const routes: Routes = [
  {
    path: "school",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./explore/school/school.module").then(
        (module) => module.SchoolModule
      ),
  },
  {
    path: "connexion",
    component: ConnexionComponent
  },
  {
    path: "inscription",
    component: InscriptionComponent
  },

  { path: "**", redirectTo: "school" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
