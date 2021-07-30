import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PasserelleComponent } from "./passerelle.component";
import { PasserelleListComponent } from "./passerelle-list/passerelle-list.component";
import { PasserelleCreateComponent } from "./passerelle-create/passerelle-create.component";
import { PasserelleEditComponent } from "./passerelle-edit/passerelle-edit.component";
import { PasserelleFilterComponent } from "./passerelle-filter/passerelle-filter.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: PasserelleComponent,
  },
];

@NgModule({
  declarations: [
    PasserelleComponent,
    PasserelleListComponent,
    PasserelleCreateComponent,
    PasserelleEditComponent,
    PasserelleFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PasserelleModule {}
