import { BureauModule } from "./../bureau/bureau.module";
import { ConsulatModule } from "./../consulat/consulat.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationComponent } from "./administration.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminMinistereComponent } from "./admin-ministere/admin-ministere.component";
import { AdminMinistereListComponent } from "./admin-ministere/admin-ministere-list/admin-ministere-list.component";
import { AdminMinistereShowComponent } from "./admin-ministere/admin-ministere-show/admin-ministere-show.component";
import { MinistereModule } from "../ministere/ministere.module";
import { AdminAmbassadeComponent } from "./admin-ambassade/admin-ambassade.component";
import { AdminAmbassadeListComponent } from "./admin-ambassade/admin-ambassade-list/admin-ambassade-list.component";
import { AdminAmbassadeShowComponent } from "./admin-ambassade/admin-ambassade-show/admin-ambassade-show.component";
import { AmbassadeModule } from "../ambassade/ambassade.module";
import { AdminConsulatComponent } from "./admin-consulat/admin-consulat.component";
import { AdminConsulatListComponent } from "./admin-consulat/admin-consulat-list/admin-consulat-list.component";
import { AdminConsulatShowComponent } from "./admin-consulat/admin-consulat-show/admin-consulat-show.component";
import { AdminBureauxComponent } from "./admin-bureaux/admin-bureaux.component";
import { AdminBureauxListComponent } from "./admin-bureaux/admin-bureaux-list/admin-bureaux-list.component";
import { AdminBureauxShowComponent } from "./admin-bureaux/admin-bureaux-show/admin-bureaux-show.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    children: [
      {
        path: "ministeres",
        component: AdminMinistereComponent,
        children: [
          {
            path: "",
            component: AdminMinistereListComponent,
          },
          {
            path: ":id",
            component: AdminMinistereShowComponent,
            children: [
              {
                path: "profil",
                loadChildren: () =>
                  import(
                    "./../ministere/profil-ministere/profil-ministere.module"
                  ).then((module) => module.ProfilMinistereModule),
              },
              {
                path: "admin",
                loadChildren: () =>
                  import(
                    "./administration-ministere/administration-ministere.module"
                  ).then((module) => module.AdministrationMinistereModule),
              },
              {
                path: "**",
                redirectTo: "profil",
              },
            ],
          },
        ],
      },
      {
        path: "ambassades",
        component: AdminAmbassadeComponent,
        children: [
          {
            path: "",
            component: AdminAmbassadeListComponent,
          },
          {
            path: ":id",
            component: AdminAmbassadeShowComponent,
            children: [
              {
                path: "profil",
                loadChildren: () =>
                  import(
                    "./../ambassade/profil-ambassade/profil-ambassade.module"
                  ).then((module) => module.ProfilAmbassadeModule),
              },
              {
                path: "admin",
                loadChildren: () =>
                  import(
                    "./../ambassade/administration-ambassade/administration-ambassade.module"
                  ).then((module) => module.AdministrationAmbassadeModule),
              },
              {
                path: "**",
                redirectTo: "profil",
              },
            ],
          },
        ],
      },
      {
        path: "consulats",
        component: AdminConsulatComponent,
        children: [
          {
            path: "",
            component: AdminConsulatListComponent,
          },
          {
            path: ":id",
            component: AdminConsulatShowComponent,
            children: [
              {
                path: "profil",
                loadChildren: () =>
                  import(
                    "./../consulat/profil-consulat/profil-consulat.module"
                  ).then((module) => module.ProfilConsulatModule),
              },
              {
                path: "admin",
                loadChildren: () =>
                  import(
                    "./../consulat/administration-consulat/administration-consulat.module"
                  ).then((module) => module.AdministrationConsulatModule),
              },
              {
                path: "**",
                redirectTo: "profil",
              },
            ],
          },
        ],
      },
      {
        path: "bureaux",
        component: AdminBureauxComponent,
        children: [
          {
            path: "",
            component: AdminBureauxListComponent,
          },
          {
            path: ":id",
            component: AdminBureauxShowComponent,
            children: [
              {
                path: "profil",
                loadChildren: () =>
                  import("./../bureau/profil-bureau/profil-bureau.module").then(
                    (module) => module.ProfilBureauModule
                  ),
              },
              {
                path: "admin",
                loadChildren: () =>
                  import(
                    "./../bureau/administration-bureau/administration-bureau.module"
                  ).then((module) => module.AdministrationBureauModule),
              },
              {
                path: "**",
                redirectTo: "profil",
              },
            ],
          },
        ],
      },
      {
        path: "**",
        redirectTo: "ministeres",
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdministrationComponent,
    AdminMinistereComponent,
    AdminMinistereListComponent,
    AdminMinistereShowComponent,
    AdminAmbassadeComponent,
    AdminAmbassadeListComponent,
    AdminAmbassadeShowComponent,
    AdminConsulatComponent,
    AdminConsulatListComponent,
    AdminConsulatShowComponent,
    AdminBureauxComponent,
    AdminBureauxListComponent,
    AdminBureauxShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    MinistereModule,
    AmbassadeModule,
    ConsulatModule,
    BureauModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdministrationModule {}
