import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IciMonPaysComponent } from "./ici-mon-pays.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { SharedModule } from "src/app/shared/shared.module";
import { IciMonPaysShowElementComponent } from "./ici-mon-pays-show-element/ici-mon-pays-show-element.component";
import { IciMonPaysEditComponent } from "./ici-mon-pays-edit/ici-mon-pays-edit.component";
import { RouterModule, Routes } from "@angular/router";
import { PresidentComponent } from "./president/president.component";
import { PresidentShowComponent } from "./president/president-show/president-show.component";
import { PresidentCreateComponent } from "./president/president-create/president-create.component";
import { PresidentEditComponent } from "./president/president-edit/president-edit.component";

const routes: Routes = [
  {
    path: "",
    component: IciMonPaysComponent,
    children: [
      {
        path: "calendrier",
        loadChildren: () =>
          import("./calendrier-evenement/calendrier-evenement.module").then(
            (module) => module.CalendrierEvenementModule
          ),
      },
      {
        path: "gouvernement",
        loadChildren: () =>
          import("./ministre-gouvernement/ministre-gouvernement.module").then(
            (module) => module.MinistreGouvernementModule
          ),
      },
      {
        path: "mot-du-president",
        component: PresidentComponent,
      },
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
  declarations: [
    IciMonPaysComponent,
    IciMonPaysShowElementComponent,
    IciMonPaysEditComponent,
    PresidentComponent,
    PresidentShowComponent,
    PresidentCreateComponent,
    PresidentEditComponent,
  ],
  imports: [
    CommonModule,
    SharedZentalModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [IciMonPaysComponent, RouterModule],
})
export class IciMonPaysModule {}
