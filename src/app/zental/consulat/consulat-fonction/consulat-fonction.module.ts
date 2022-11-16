import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatFonctionComponent } from "./consulat-fonction.component";
import { RouterModule, Routes } from "@angular/router";
import { FonctionModule } from "../../fonction/fonction.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatFonctionComponent,
  },
];

@NgModule({
  declarations: [ConsulatFonctionComponent],
  imports: [CommonModule, FonctionModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatFonctionModule {}
