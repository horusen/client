import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SujetComponent } from "./sujet.component";
import { SujetListComponent } from "./sujet-list/sujet-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SujetCreateComponent } from './sujet-create/sujet-create.component';
import { SujetEditComponent } from './sujet-edit/sujet-edit.component';

@NgModule({
  declarations: [SujetComponent, SujetListComponent, SujetCreateComponent, SujetEditComponent],
  imports: [CommonModule, SharedModule],
  exports: [SujetComponent],
})
export class SujetModule {}
