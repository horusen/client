import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FonctionComponent } from "./fonction.component";
import { FonctionListComponent } from "./fonction-list/fonction-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { FonctionShowComponent } from "./fonction-show/fonction-show.component";
import { FonctionDescriptionComponent } from "./fonction-show/fonction-description/fonction-description.component";
import { FonctionEmployeComponent } from "./fonction-show/fonction-employe/fonction-employe.component";
import { EmployeModule } from "../employe/employe.module";

@NgModule({
  declarations: [
    FonctionComponent,
    FonctionListComponent,
    FonctionShowComponent,
    FonctionDescriptionComponent,
    FonctionEmployeComponent,
  ],
  imports: [CommonModule, SharedModule, EmployeModule, SharedZentalModule],
  exports: [FonctionComponent],
})
export class FonctionModule {}
