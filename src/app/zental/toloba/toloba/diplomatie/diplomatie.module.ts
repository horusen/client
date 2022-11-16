import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiplomatieComponent } from "./diplomatie.component";
import { SharedModule } from "src/app/shared/shared.module";

import { DiplomatieAmbassadeComponent } from "./diplomatie-ambassade/diplomatie-ambassade.component";
import { DiplomatieAmbassadeListComponent } from "./diplomatie-ambassade/diplomatie-ambassade-list/diplomatie-ambassade-list.component";
import { DiplomatieAmbassadeShowComponent } from "./diplomatie-ambassade/diplomatie-ambassade-show/diplomatie-ambassade-show.component";
import { DiplomatieConsulatComponent } from "./diplomatie-consulat/diplomatie-consulat.component";
import { DiplomatieLiaisonComponent } from "./diplomatie-liaison/diplomatie-liaison.component";
import { DiplomatieConsulatListComponent } from "./diplomatie-consulat/diplomatie-consulat-list/diplomatie-consulat-list.component";
import { DiplomatieConsulatShowComponent } from "./diplomatie-consulat/diplomatie-consulat-show/diplomatie-consulat-show.component";
import { DiplomatieLiaisonListComponent } from "./diplomatie-liaison/diplomatie-liaison-list/diplomatie-liaison-list.component";
import { DiplomatieLiaisonShowComponent } from "./diplomatie-liaison/diplomatie-liaison-show/diplomatie-liaison-show.component";
import { AmbassadeModule } from "src/app/zental/ambassade/ambassade.module";
import { ConsulatModule } from "src/app/zental/consulat/consulat.module";
import { LiaisonModule } from "src/app/zental/liaison/liaison.module";
import { ServiceModule } from "src/app/zental/service/service.module";

const routes: Routes = [
  {
    path: ":id",
    component: DiplomatieComponent,
    children: [
      {
        path: "ambassades",
        component: DiplomatieAmbassadeComponent,
        children: [
          {
            path: "",
            component: DiplomatieAmbassadeListComponent,
          },
          {
            path: ":id",
            component: DiplomatieAmbassadeShowComponent,
          },
        ],
      },
      {
        path: "consulats",
        component: DiplomatieConsulatComponent,
        children: [
          {
            path: "",
            component: DiplomatieConsulatListComponent,
          },
          {
            path: ":id",
            component: DiplomatieConsulatShowComponent,
          },
        ],
      },
      {
        path: "liaisons",
        component: DiplomatieLiaisonComponent,
        children: [
          {
            path: "",
            component: DiplomatieLiaisonListComponent,
          },
          {
            path: ":id",
            component: DiplomatieLiaisonShowComponent,
          },
        ],
      },
      {
        path: "**",
        redirectTo: "ambassades",
      },
    ],
  },
  {
    path: "",
    redirectTo: "../",
  },
];

@NgModule({
  declarations: [
    DiplomatieComponent,
    DiplomatieAmbassadeComponent,
    DiplomatieAmbassadeListComponent,
    DiplomatieAmbassadeShowComponent,
    DiplomatieConsulatComponent,
    DiplomatieLiaisonComponent,
    DiplomatieConsulatListComponent,
    DiplomatieConsulatShowComponent,
    DiplomatieLiaisonListComponent,
    DiplomatieLiaisonShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AmbassadeModule,
    ConsulatModule,
    LiaisonModule,
    ServiceModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class DiplomatieModule {}
