import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatComponent } from "./consulat.component";
import { ConsulatEditComponent } from "./consulat-edit/consulat-edit.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { ConsulatListComponent } from "./consulat-list/consulat-list.component";
import { ConsulatShowComponent } from "./consulat-show/consulat-show.component";
import { ConsulatDetailsComponent } from "./consulat-details/consulat-details.component";
import { InstitutionModule } from "../institution/institution.module";

@NgModule({
  declarations: [
    ConsulatComponent,
    ConsulatEditComponent,
    ConsulatListComponent,
    ConsulatShowComponent,
    ConsulatDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule, InstitutionModule],
  exports: [
    ConsulatComponent,
    ConsulatShowComponent,
    ConsulatListComponent,
    ConsulatEditComponent,
  ],
})
export class ConsulatModule {}
