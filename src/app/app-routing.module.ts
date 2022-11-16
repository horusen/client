import { EmailVerificationComponent } from "./auth/email-verification/email-verification.component";
import { EmailVerifiedGuard } from "./auth/email-verified.guard";
import { DeconnexionComponent } from "./authentification/deconnexion/deconnexion.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./authentification/auth.guard";
import { ConnexionComponent } from "./authentification/connexion/connexion.component";
import { InscriptionComponent } from "./authentification/inscription/inscription.component";
import { EmailUnverifiedComponent } from "./auth/email-unverified/email-unverified.component";

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
    path: "email-unverified",
    canActivate: [AuthGuard],
    component: EmailUnverifiedComponent,
  },
  {
    path: "email/verify",
    canActivate: [AuthGuard],
    component: EmailVerificationComponent,
  },
  {
    path: "deconnexion",
    component: DeconnexionComponent,
  },
  {
    path: "",
    canActivate: [AuthGuard, EmailVerifiedGuard],
    loadChildren: () =>
      import("./zental/zental.module").then((module) => module.ZentalModule),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
