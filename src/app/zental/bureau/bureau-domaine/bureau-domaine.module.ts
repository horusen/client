import { SharedModule } from "./../../../shared/shared.module";
import { DomaineModule } from "./../../domaine/domaine.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauDomaineComponent } from "./bureau-domaine.component";
import { RouterModule, Routes } from "@angular/router";
import { DomaineShowComponent } from "../../domaine/domaine-show/domaine-show.component";
import { DomaineDescriptionComponent } from "../../domaine/domaine-show/domaine-description/domaine-description.component";
import { DomaineDepartementComponent } from "../../domaine/domaine-show/domaine-departement/domaine-departement.component";
import { DomaineServiceComponent } from "../../domaine/domaine-show/domaine-service/domaine-service.component";
import { DomaineEmployeComponent } from "../../domaine/domaine-show/domaine-employe/domaine-employe.component";

const routes: Routes = [
  {
    path: "",
    component: BureauDomaineComponent,
  },
  {
    path: ":id",
    component: DomaineShowComponent,
    children: [
      { path: "", component: DomaineDescriptionComponent },
      { path: "departement", component: DomaineDepartementComponent },
      { path: "service", component: DomaineServiceComponent },
      { path: "employe", component: DomaineEmployeComponent },
    ],
  },
];

@NgModule({
  declarations: [BureauDomaineComponent],
  imports: [
    CommonModule,
    DomaineModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class BureauDomaineModule {}
