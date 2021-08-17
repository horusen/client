import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IdentiteComponent } from "./identite.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CiviliteComponent } from "./civilite/civilite.component";
import { UserInformationComponent } from "./user-information/user-information.component";
import { InformationMembreFamilleComponent } from "./information-membre-famille/information-membre-famille.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { IdentiteDetailsComponent } from './identite-details/identite-details.component';
import { PieceConsulaireComponent } from './piece-consulaire/piece-consulaire.component';
import { PieceConsulaireCreateComponent } from './piece-consulaire/piece-consulaire-create/piece-consulaire-create.component';
import { PieceConsulaireSoloComponent } from './piece-consulaire/piece-consulaire-solo/piece-consulaire-solo.component';
import { PieceConsulaireEditComponent } from './piece-consulaire/piece-consulaire-edit/piece-consulaire-edit.component';
import { ContactUrgentComponent } from './contact-urgent/contact-urgent.component';
import { ContactUrgentListComponent } from './contact-urgent/contact-urgent-list/contact-urgent-list.component';
import { ContactUrgentShowComponent } from './contact-urgent/contact-urgent-show/contact-urgent-show.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "current-user",
  },
  {
    path: ":id",
    component: IdentiteComponent,
    children: [
      {
        path: "",
        component: CiviliteComponent,
      },
      {
        path: "contact",
        loadChildren: () =>
          import("./../contact-user/contact-user.module").then(
            (module) => module.ContactUserModule
          ),
      },
      {
        path: "famille",
        loadChildren: () =>
          import("./../famille/famille.module").then(
            (module) => module.FamilleModule
          ),
      },
      {
        path: "emploie",
        loadChildren: () =>
          import("./../emploie/emploie.module").then(
            (module) => module.EmploieModule
          ),
      },
      {
        path: "relation",
        loadChildren: () =>
          import(
            "./../relation-interpersonnelle/relation-interpersonnelle.module"
          ).then((module) => module.RelationInterpersonnelleModule),
      },
      {
        path: "diplome",
        loadChildren: () =>
          import("./../diplome/diplome.module").then(
            (module) => module.DiplomeModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    IdentiteComponent,
    CiviliteComponent,

    UserInformationComponent,
    InformationMembreFamilleComponent,
    IdentiteDetailsComponent,
    PieceConsulaireComponent,
    PieceConsulaireCreateComponent,
    PieceConsulaireSoloComponent,
    PieceConsulaireEditComponent,
    ContactUrgentComponent,
    ContactUrgentListComponent,
    ContactUrgentShowComponent,
  ],
  imports: [
    CommonModule,
    SharedZentalModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class IdentiteModule {}
