import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IciMonPaysComponent } from "./ici-mon-pays.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { IciMonPaysShowElementComponent } from "./ici-mon-pays-show-element/ici-mon-pays-show-element.component";
import { IciMonPaysEditComponent } from './ici-mon-pays-edit/ici-mon-pays-edit.component';

const routes: Routes = [
  {
    path: "",
    component: IciMonPaysComponent,
    children: [
      {
        path: ":id",
        component: IciMonPaysShowElementComponent,
      },
      {
        path: "**",
        redirectTo: "ici-chez-nous",
      },
    ],
  },
];

@NgModule({
  declarations: [IciMonPaysComponent, IciMonPaysShowElementComponent, IciMonPaysEditComponent],
  imports: [
    CommonModule,
    SharedZentalModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class IciMonPaysModule {}
