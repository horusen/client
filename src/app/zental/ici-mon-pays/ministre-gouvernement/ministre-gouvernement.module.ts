import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistreGouvernementComponent } from "./ministre-gouvernement.component";
import { MinistreGouvernementCreateComponent } from "./ministre-gouvernement-create/ministre-gouvernement-create.component";
import { MinistreGouvernementListComponent } from "./ministre-gouvernement-list/ministre-gouvernement-list.component";
import { MinistreGouvernementEditComponent } from "./ministre-gouvernement-edit/ministre-gouvernement-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MinistreGouvernementComponent,
  },
];

@NgModule({
  declarations: [
    MinistreGouvernementComponent,
    MinistreGouvernementCreateComponent,
    MinistreGouvernementListComponent,
    MinistreGouvernementEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MinistreGouvernementModule {}
