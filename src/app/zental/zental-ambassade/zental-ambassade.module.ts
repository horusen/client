import { SharedModule } from "./../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalAmbassadeComponent } from "./zental-ambassade.component";
import { AmbassadeModule } from "../ambassade/ambassade.module";
import { ZentalAmbassadeShowComponent } from "./zental-ambassade-show/zental-ambassade-show.component";

const routes: Routes = [
  {
    path: "",
    component: ZentalAmbassadeComponent,
  },
  {
    path: ":id",
    component: ZentalAmbassadeShowComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "./../ambassade/profil-ambassade/profil-ambassade.module"
          ).then((module) => module.ProfilAmbassadeModule),
      },
    ],
  },
];

@NgModule({
  declarations: [ZentalAmbassadeComponent, ZentalAmbassadeShowComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AmbassadeModule,
  ],
  exports: [RouterModule],
})
export class ZentalAmbassadeModule {}
