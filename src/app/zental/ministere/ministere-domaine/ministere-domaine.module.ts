import { DomaineEmployeComponent } from "./../../domaine/domaine-show/domaine-employe/domaine-employe.component";
import { DomaineServiceComponent } from "./../../domaine/domaine-show/domaine-service/domaine-service.component";
import { DomaineDescriptionComponent } from "./../../domaine/domaine-show/domaine-description/domaine-description.component";
import { DomaineModule } from "./../../domaine/domaine.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereDomaineComponent } from "./ministere-domaine.component";
import { RouterModule, Routes } from "@angular/router";
import { DomaineDepartementComponent } from "../../domaine/domaine-show/domaine-departement/domaine-departement.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DomaineShowComponent } from "../../domaine/domaine-show/domaine-show.component";

const routes: Routes = [
  {
    path: "",
    component: MinistereDomaineComponent,
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
  declarations: [MinistereDomaineComponent],
  imports: [
    CommonModule,
    DomaineModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MinistereDomaineModule {}
