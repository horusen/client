import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TacheGroupeComponent } from "./tache-groupe.component";
import { TacheGroupeListComponent } from "./tache-groupe-list/tache-groupe-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AffecterTacheByGroupeComponent } from "./affecter-tache-by-groupe/affecter-tache-by-groupe.component";
import { SharedSchoolModule } from "../../../shared-school/shared-school.module";

@NgModule({
  declarations: [
    TacheGroupeComponent,
    TacheGroupeListComponent,
    AffecterTacheByGroupeComponent,
  ],
  imports: [CommonModule, SharedModule, SharedSchoolModule],
  exports: [TacheGroupeComponent],
})
export class TacheGroupeModule {}
