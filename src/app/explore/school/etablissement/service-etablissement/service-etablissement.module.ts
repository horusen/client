import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ServiceEtablissementComponent } from "./service-etablissement.component";
import { ServiceEtablissementListComponent } from './service-etablissement-list/service-etablissement-list.component';

const routes: Routes = [
  {
    path: "",
    component: ServiceEtablissementComponent,
  },
];

@NgModule({
  declarations: [
    ServiceEtablissementComponent,
    ServiceEtablissementListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceEtablissementModule {}
