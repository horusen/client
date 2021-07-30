import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainHeaderComponent } from "./component/main-header/main-header.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EntiteDiplomatiqueCreateComponent } from "./abstract/entite-diplomatique-create/entite-diplomatique-create.component";
import { EntiteDiplomatiqueEditComponent } from "./abstract/entite-diplomatique-edit/entite-diplomatique-edit.component";
import { PosteCreateComponent } from "../poste/poste-create/poste-create.component";

@NgModule({
  declarations: [
    MainHeaderComponent,
    EntiteDiplomatiqueCreateComponent,
    EntiteDiplomatiqueEditComponent,
    PosteCreateComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [MainHeaderComponent, PosteCreateComponent],
})
export class SharedZentalModule {}
