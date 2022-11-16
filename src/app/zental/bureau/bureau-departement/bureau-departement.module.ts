import { DepartementModule } from "./../../departement/departement.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauDepartementComponent } from "./bureau-departement.component";
import { DepartmentShowComponent } from "../../departement/department-show/department-show.component";
import { DepartementDescriptionComponent } from "../../departement/departement-show/departement-description/departement-description.component";
import { DepartementServicesComponent } from "../../departement/departement-show/departement-services/departement-services.component";
import { DepartementEmployesComponent } from "../../departement/departement-show/departement-employes/departement-employes.component";

const routes: Routes = [
  {
    path: "",
    component: BureauDepartementComponent,
  },
  {
    path: ":id",
    component: DepartmentShowComponent,
    children: [
      { path: "", component: DepartementDescriptionComponent },
      { path: "service", component: DepartementServicesComponent },
      { path: "employe", component: DepartementEmployesComponent },
    ],
  },
];

@NgModule({
  declarations: [BureauDepartementComponent],
  imports: [CommonModule, DepartementModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BureauDepartementModule {}
