import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { BureauServiceComponent } from "./bureau-service.component";
import { ServiceShowComponent } from "../../service/service-show/service-show.component";
import { ServiceDescriptionComponent } from "../../service/service-show/service-description/service-description.component";
import { ServiceEmployeComponent } from "../../service/service-show/service-employe/service-employe.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ServiceModule } from "../../service/service.module";

const routes: Routes = [
  {
    path: "",
    component: BureauServiceComponent,
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
  declarations: [BureauServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class BureauServiceModule {}
