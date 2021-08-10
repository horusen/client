import { ResponsableModule } from "./../responsable/responsable.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistreComponent } from "./ministre.component";
import { MinistreListComponent } from "./ministre-list/ministre-list.component";
import { MinistreShowComponent } from "./ministre-show/ministre-show.component";
import { MinistreCreateComponent } from "./ministre-create/ministre-create.component";
import { MinistreEditComponent } from "./ministre-edit/ministre-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MinistreListContainerComponent } from "./ministre-list-container/ministre-list-container.component";
import { FiltreMinistreComponent } from "./filtre-ministre/filtre-ministre.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: MinistreComponent,
    children: [
      {
        path: "",
        component: MinistreListContainerComponent,
      },
      {
        path: ":id",
        component: MinistreShowComponent,
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./../membre-cabinet/membre-cabinet.module").then(
                (module) => module.MembreCabinetModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    MinistreComponent,
    MinistreListComponent,
    MinistreShowComponent,
    MinistreCreateComponent,
    MinistreEditComponent,
    MinistreListContainerComponent,
    FiltreMinistreComponent,
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
export class MinistreModule {}
