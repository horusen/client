import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeurComponent } from "./ambassadeur.component";
import { AmbassadeurListComponent } from "./ambassadeur-list/ambassadeur-list.component";
import { AmbassadeurShowComponent } from "./ambassadeur-show/ambassadeur-show.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { ResponsableModule } from "../../responsable/responsable.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeurComponent,
    children: [
      {
        path: "",
        component: AmbassadeurListComponent,
      },
      {
        path: ":id",
        component: AmbassadeurShowComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AmbassadeurComponent,
    AmbassadeurListComponent,
    AmbassadeurShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    ResponsableModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AmbassadeurModule {}
