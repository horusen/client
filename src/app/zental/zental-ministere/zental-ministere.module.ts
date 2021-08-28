import { SharedModule } from "../../shared/shared.module";
import { ZentalMinistereComponent } from "./zental-ministere.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MinistereModule } from "src/app/zental/ministere/ministere.module";
import { ZentalMinistereShowComponent } from "./zental-ministere-show/zental-ministere-show.component";

const routes: Routes = [
  {
    path: "",
    component: ZentalMinistereComponent,
  },

  {
    path: ":id",
    component: ZentalMinistereShowComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../ministere/profil-ministere/profil-ministere.module").then(
            (module) => module.ProfilMinistereModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ZentalMinistereComponent, ZentalMinistereShowComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MinistereModule,
  ],
  exports: [RouterModule],
})
export class ZentalMinistereModule {}
