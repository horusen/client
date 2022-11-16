import { RouterModule, Routes } from "@angular/router";
import { CitoyenModule } from "./../../citoyen/citoyen.module";
import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeCitoyenComponent } from "./ambassade-citoyen.component";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeCitoyenComponent,
  },
];

@NgModule({
  declarations: [AmbassadeCitoyenComponent],
  imports: [
    CommonModule,
    SharedModule,
    CitoyenModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AmbassadeCitoyenModule {}
