import { RouterModule, Routes } from "@angular/router";
import { SharedZentalModule } from "./../../shared-zental/shared-zental.module";
import { SharedModule } from "./../../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendrierEvenementComponent } from "./calendrier-evenement.component";
import { CalendrierEvenementCreateComponent } from "./calendrier-evenement-create/calendrier-evenement-create.component";
import { CalendrierEvenementEditComponent } from "./calendrier-evenement-edit/calendrier-evenement-edit.component";
import { CalendrierEvenementListComponent } from "./calendrier-evenement-list/calendrier-evenement-list.component";

const routes: Routes = [
  {
    path: "",
    component: CalendrierEvenementComponent,
  },
];

@NgModule({
  declarations: [
    CalendrierEvenementComponent,
    CalendrierEvenementCreateComponent,
    CalendrierEvenementEditComponent,
    CalendrierEvenementListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CalendrierEvenementModule {}
