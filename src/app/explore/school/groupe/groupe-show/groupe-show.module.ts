import { GroupeEditComponent } from "./../groupe-edit/groupe-edit.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupeShowComponent } from "./groupe-show.component";
import { GroupeDetailsComponent } from "./groupe-details/groupe-details.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MembreGroupeModule } from "./membre-groupe/membre-groupe.module";
import { TacheGroupeModule } from "./tache-groupe/tache-groupe.module";

@NgModule({
  declarations: [
    GroupeShowComponent,
    GroupeDetailsComponent,
    GroupeEditComponent,
  ],
  imports: [CommonModule, SharedModule, MembreGroupeModule, TacheGroupeModule],
  exports: [GroupeShowComponent],
})
export class GroupeShowModule {}
