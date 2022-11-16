import { EspaceConsulaireComponent } from "./espace-consulaire/espace-consulaire.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalComponent } from "./zental.component";
import { RouterModule, Routes } from "@angular/router";
import { TemplateComponent } from "./template/template.component";
import { SharedModule } from "../shared/shared.module";
import { InscriptionTempComponent } from "./inscription-temp/inscription-temp.component";
import { SharedZentalModule } from "./shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: ZentalComponent,
    children: [
      {
        path: "",
        component: EspaceConsulaireComponent,
        // component: TemplateComponent,
      },
      {
        path: "administration",
        loadChildren: () =>
          import("./administration/administration.module").then(
            (module) => module.AdministrationModule
          ),
      },
      {
        path: "identite",
        loadChildren: () =>
          import("./identite/identite.module").then(
            (module) => module.IdentiteModule
          ),
      },
      {
        path: "ministeres",
        loadChildren: () =>
          import("./zental-ministere/zental-ministere.module").then(
            (module) => module.ZentalMinistereModule
          ),
      },
      {
        path: "ambassades",
        loadChildren: () =>
          import("./zental-ambassade/zental-ambassade.module").then(
            (module) => module.ZentalAmbassadeModule
          ),
      },
      {
        path: "consulats",
        loadChildren: () =>
          import("./zental-consulat/zental-consulat.module").then(
            (module) => module.ZentalConsulatModule
          ),
      },
      {
        path: "liaisons",
        loadChildren: () =>
          import("./zental-liaison/zental-liaison.module").then(
            (module) => module.ZentalLiaisonModule
          ),
      },
      {
        path: "passerelles",
        loadChildren: () =>
          import("./zental-passerelle/zental-passerelle.module").then(
            (module) => module.ZentalPasserelleModule
          ),
      },
      {
        path: "bureaux",
        loadChildren: () =>
          import("./zental-bureau/zental-bureau.module").then(
            (module) => module.ZentalBureauModule
          ),
      },
      {
        path: "toloba",
        loadChildren: () =>
          import("./toloba/toloba/toloba.module").then(
            (module) => module.TolobaModule
          ),
      },
      {
        path: "inscription-temp",
        component: InscriptionTempComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ZentalComponent,
    TemplateComponent,
    InscriptionTempComponent,
    EspaceConsulaireComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ZentalModule {}
