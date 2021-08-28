import { ServiceModule } from "./../../service/service.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LiaisonServiceComponent } from "./liaison-service.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: LiaisonServiceComponent,
  },
];

@NgModule({
  declarations: [LiaisonServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LiaisonServiceModule {}
