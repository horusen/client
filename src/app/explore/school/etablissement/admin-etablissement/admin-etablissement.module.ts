import { SharedModule } from "./../../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";
import { AdminEtablissementComponent } from "./admin-etablissement.component";
import { AdminEtablissementListComponent } from "./admin-etablissement-list/admin-etablissement-list.component";
import { ChargerCommunicationEtablissementListComponent } from "./charger-communication-etablissement/charger-communication-etablissement-list/charger-communication-etablissement-list.component";
import { AdminEtablissementAddComponent } from "./admin-etablissement-add/admin-etablissement-add.component";
import { ChargerCommnunicationEtablissementAddComponent } from "./charger-communication-etablissement/charger-commnunication-etablissement-add/charger-commnunication-etablissement-add.component";

const routes: Routes = [
  {
    path: "",
    component: AdminEtablissementComponent,
  },
];

@NgModule({
  declarations: [
    AdminEtablissementComponent,
    AdminEtablissementListComponent,
    ChargerCommunicationEtablissementListComponent,
    AdminEtablissementAddComponent,
    ChargerCommnunicationEtablissementAddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdminEtablissementModule {}
