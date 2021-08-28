import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatServiceComponent } from "./consulat-service.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ServiceModule } from "../../service/service.module";
import { RouterModule, Routes } from "@angular/router";
import { ServiceShowComponent } from "../../service/service-show/service-show.component";
import { ServiceDescriptionComponent } from "../../service/service-show/service-description/service-description.component";
import { ServiceEmployeComponent } from "../../service/service-show/service-employe/service-employe.component";

const routes: Routes = [
  {
    path: "",
    component: ConsulatServiceComponent,
  },
  {
    path: ":id",
    component: ServiceShowComponent,
    children: [
      { path: "", component: ServiceDescriptionComponent },
      { path: "employe", component: ServiceEmployeComponent },
    ],
  },
];

@NgModule({
  declarations: [ConsulatServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ConsulatServiceModule {}
