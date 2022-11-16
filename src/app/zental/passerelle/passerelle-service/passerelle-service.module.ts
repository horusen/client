import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ServiceModule } from "./../../service/service.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PasserelleServiceComponent } from "./passerelle-service.component";

const routes: Routes = [
  {
    path: "",
    component: PasserelleServiceComponent,
  },
];

@NgModule({
  declarations: [PasserelleServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PasserelleServiceModule {}
