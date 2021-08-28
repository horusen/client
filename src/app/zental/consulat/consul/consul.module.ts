import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulComponent } from "./consul.component";
import { ConsulListComponent } from "./consul-list/consul-list.component";
import { ConsulShowComponent } from "./consul-show/consul-show.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { ResponsableModule } from "../../responsable/responsable.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ConsulComponent,
    children: [
      {
        path: "",
        component: ConsulListComponent,
      },
      {
        path: ":id",
        component: ConsulShowComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [ConsulComponent, ConsulListComponent, ConsulShowComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    ResponsableModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ConsulModule {}
