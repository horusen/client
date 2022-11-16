import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComposantDescriptionComponent } from "./composant-description/composant-description.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ComposantDescriptionComponent],
  imports: [CommonModule, SharedModule],
  exports: [ComposantDescriptionComponent],
})
export class ComposantDescriptionModule {}
