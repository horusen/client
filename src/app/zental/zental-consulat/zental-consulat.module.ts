import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalConsulatComponent } from "./zental-consulat.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ConsulatModule } from "../consulat/consulat.module";
import { ZentalConsulatShowComponent } from "./zental-consulat-show/zental-consulat-show.component";

const routes: Routes = [
  {
    path: "",
    component: ZentalConsulatComponent,
  },
  {
    path: ":id",
    component: ZentalConsulatShowComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./../consulat/profil-consulat/profil-consulat.module").then(
            (module) => module.ProfilConsulatModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ZentalConsulatComponent, ZentalConsulatShowComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConsulatModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ZentalConsulatModule {}
