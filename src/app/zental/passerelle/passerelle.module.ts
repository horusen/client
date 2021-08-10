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
import { PasserelleShowComponent } from "./passerelle-show/passerelle-show.component";
import { AffecterPasserelleComponent } from "./affecter-passerelle/affecter-passerelle.component";
import { PasserelleDescriptionComponent } from "./passerelle-description/passerelle-description.component";
import { PasserelleEmployesComponent } from "./passerelle-employes/passerelle-employes.component";
import { EmployeModule } from "../employe/employe.module";

const routes: Routes = [
  {
    path: "",
    component: PasserelleComponent,
  },
  {
    path: ":id",
    component: PasserelleShowComponent,
    children: [
      { path: "", component: PasserelleDescriptionComponent },
      { path: "employes", component: PasserelleEmployesComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PasserelleComponent,
    PasserelleListComponent,
    PasserelleCreateComponent,
    PasserelleEditComponent,
    PasserelleFilterComponent,
    PasserelleShowComponent,
    AffecterPasserelleComponent,
    PasserelleDescriptionComponent,
    PasserelleEmployesComponent,
  ],
  imports: [
    CommonModule,
    EmployeModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PasserelleModule {}
