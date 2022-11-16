import { SharedModule } from "./../../../shared/shared.module";
import { SharedIdentiteModule } from "./../shared-identite/shared-identite.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IdentiteMinComponent } from "./identite-min.component";

@NgModule({
  declarations: [IdentiteMinComponent],
  imports: [CommonModule, SharedIdentiteModule, SharedModule],
  exports: [IdentiteMinComponent],
})
export class IdentiteMinModule {}
