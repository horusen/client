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
import { EmployeModule } from "../employe/employe.module";

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
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    // RouterModule.forChild(routes),
  ],
  exports: [PasserelleComponent],
})
export class PasserelleModule {}
