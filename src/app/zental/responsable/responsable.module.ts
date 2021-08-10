import { ResponsableListComponent } from "./responsable-list/responsable-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResponsableComponent } from "./responsable.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { ResponsableCreateComponent } from "./responsable-create/responsable-create.component";
import { ResponsableEditComponent } from "./responsable-edit/responsable-edit.component";

@NgModule({
  declarations: [
    ResponsableComponent,
    ResponsableCreateComponent,
    ResponsableEditComponent,
    ResponsableListComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule],
  exports: [ResponsableComponent, ResponsableListComponent],
})
export class ResponsableModule {}
