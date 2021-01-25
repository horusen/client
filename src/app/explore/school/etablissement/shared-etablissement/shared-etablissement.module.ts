import { EtablissementListComponent } from "./../etablissement-list/etablissement-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [EtablissementListComponent],
  imports: [CommonModule, SharedModule],
  exports: [EtablissementListComponent],
})
export class SharedEtablissementModule {}
