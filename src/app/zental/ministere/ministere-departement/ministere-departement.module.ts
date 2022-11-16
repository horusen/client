import { DepartementServicesComponent } from "./../../departement/departement-show/departement-services/departement-services.component";
import { DepartementEmployesComponent } from "./../../departement/departement-show/departement-employes/departement-employes.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereDepartementComponent } from "./ministere-departement.component";
import { RouterModule, Routes } from "@angular/router";
import { DepartmentShowComponent } from "../../departement/department-show/department-show.component";
import { DepartementDescriptionComponent } from "../../departement/departement-show/departement-description/departement-description.component";
import { DepartementModule } from "../../departement/departement.module";

const routes: Routes = [
  {
    path: "",
    component: MinistereDepartementComponent,
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
  declarations: [MinistereDepartementComponent],
  imports: [CommonModule, DepartementModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinistereDepartementModule {}
