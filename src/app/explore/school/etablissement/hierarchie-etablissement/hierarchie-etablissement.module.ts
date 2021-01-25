import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HierarchieEtablissementComponent } from "./hierarchie-etablissement.component";
import { HierarchieEtablissementListComponent } from "./hierarchie-etablissement-list/hierarchie-etablissement-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedEtablissementModule } from "../shared-etablissement/shared-etablissement.module";
import { AffiliationEtablissementAddComponent } from "../affiliation-etablissement/affiliation-etablissement-add/affiliation-etablissement-add.component";

const routes: Routes = [
  {
    path: "",
    component: HierarchieEtablissementComponent,
  },
];

@NgModule({
  declarations: [
    HierarchieEtablissementComponent,
    HierarchieEtablissementListComponent,
    AffiliationEtablissementAddComponent,
  ],
  imports: [
    CommonModule,
    SharedEtablissementModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class HierarchieEtablissementModule {}
