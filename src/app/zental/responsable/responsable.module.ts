import { ResponsableListComponent } from "./responsable-list/responsable-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResponsableComponent } from "./responsable.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { ResponsableCreateComponent } from "./responsable-create/responsable-create.component";
import { ResponsableEditComponent } from "./responsable-edit/responsable-edit.component";
import { ResonsableShowComponent } from "./resonsable-show/resonsable-show.component";
import { EmployeModule } from "../employe/employe.module";

@NgModule({
  declarations: [
    ResponsableComponent,
    ResponsableCreateComponent,
    ResponsableEditComponent,
    ResponsableListComponent,
    ResonsableShowComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule, EmployeModule],
  exports: [
    ResponsableComponent,
    ResponsableListComponent,
    ResonsableShowComponent,
  ],
})
export class ResponsableModule {}
