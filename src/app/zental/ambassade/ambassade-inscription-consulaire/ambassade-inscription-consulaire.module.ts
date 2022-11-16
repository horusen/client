import { PieceConsulaireAltComponent } from "./../../identite/piece-consulaire-alt/piece-consulaire-alt.component";
import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeInscriptionConsulaireComponent } from "./ambassade-inscription-consulaire.component";
import { RouterModule, Routes } from "@angular/router";
import { InscriptionConsulaireModule } from "../../inscription-consulaire/inscription-consulaire.module";
import { InscriptionConsulaireShowComponent } from "../../inscription-consulaire/inscription-consulaire-show/inscription-consulaire-show.component";
import { CiviliteComponent } from "../../identite/civilite/civilite.component";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeInscriptionConsulaireComponent,
    children: [
      {
        path: ":id",
        component: InscriptionConsulaireShowComponent,
        children: [
          {
            path: "",
            component: CiviliteComponent,
          },
          {
            path: "contact",
            loadChildren: () =>
              import("./../../contact-user/contact-user.module").then(
                (module) => module.ContactUserModule
              ),
          },
          {
            path: "famille",
            loadChildren: () =>
              import("./../../famille/famille.module").then(
                (module) => module.FamilleModule
              ),
          },
          {
            path: "emploie",
            loadChildren: () =>
              import("./../../emploie/emploie.module").then(
                (module) => module.EmploieModule
              ),
          },

          {
            path: "diplome",
            loadChildren: () =>
              import("./../../diplome/diplome.module").then(
                (module) => module.DiplomeModule
              ),
          },
          {
            path: "pieces-consulaires",
            component: PieceConsulaireAltComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [AmbassadeInscriptionConsulaireComponent],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionConsulaireModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AmbassadeInscriptionConsulaireModule {}
