import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EleveComponent } from "./eleve.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EleveListComponent } from "./eleve-list/eleve-list.component";
import { Routes } from "@angular/router";
import { EleveListByProfesseurComponent } from './eleve-list-by-professeur/eleve-list-by-professeur.component';

const routes: Routes = [
  {
    path: "",
    component: EleveComponent,
  },
];

@NgModule({
  declarations: [EleveComponent, EleveListComponent, EleveListByProfesseurComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EleveModule {}
