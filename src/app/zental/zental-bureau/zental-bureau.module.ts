import { BureauShowComponent } from "./../bureau/bureau-show/bureau-show.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./../../shared/shared.module";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalBureauComponent } from "./zental-bureau.component";
import { BureauModule } from "../bureau/bureau.module";

const routes: Routes = [
  {
    path: "",
    component: ZentalBureauComponent,
  },
  {
    path: ":id",
    component: BureauShowComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./../bureau/profil-bureau/profil-bureau.module").then(
            (module) => module.ProfilBureauModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ZentalBureauComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    BureauModule,
  ],
  exports: [RouterModule],
})
export class ZentalBureauModule {}
