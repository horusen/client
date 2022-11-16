import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupeComponent } from "./groupe.component";
import { GroupeCreateComponent } from "./groupe-create/groupe-create.component";
import { GroupeEditComponent } from "./groupe-edit/groupe-edit.component";
import { GroupeShowComponent } from "./groupe-show/groupe-show.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { GroupeListComponent } from "./groupe-list/groupe-list.component";
import { GroupeSoloComponent } from "./groupe-solo/groupe-solo.component";
import { GroupeDetailsComponent } from "./groupe-details/groupe-details.component";

@NgModule({
  declarations: [
    GroupeComponent,
    GroupeCreateComponent,
    GroupeEditComponent,
    GroupeShowComponent,
    GroupeListComponent,
    GroupeSoloComponent,
    GroupeDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule],
  exports: [GroupeComponent],
})
export class GroupeModule {}
