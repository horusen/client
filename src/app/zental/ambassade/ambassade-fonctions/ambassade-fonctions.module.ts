import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeFonctionsComponent } from "./ambassade-fonctions.component";
import { RouterModule, Routes } from "@angular/router";
import { FonctionModule } from "../../fonction/fonction.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeFonctionsComponent,
  },
];

@NgModule({
  declarations: [AmbassadeFonctionsComponent],
  imports: [CommonModule, FonctionModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadeFonctionsModule {}
