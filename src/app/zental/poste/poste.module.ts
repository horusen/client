import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { PosteComponent } from "./poste.component";
import { PosteListComponent } from "./poste-list/poste-list.component";
import { PosteEditComponent } from "./poste-edit/poste-edit.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { PosteShowComponent } from "./poste-show/poste-show.component";
import { PosteDescriptionComponent } from "./poste-show/poste-description/poste-description.component";
import { PosteEmployeComponent } from "./poste-show/poste-employe/poste-employe.component";
import { EmployeModule } from "../employe/employe.module";

@NgModule({
  declarations: [
    PosteComponent,
    PosteListComponent,
    PosteEditComponent,
    PosteShowComponent,
    PosteDescriptionComponent,
    PosteEmployeComponent,
  ],
  imports: [CommonModule, SharedModule, EmployeModule, SharedZentalModule],
  exports: [PosteComponent],
})
export class PosteModule {}
