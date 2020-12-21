import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ClasseComponent } from "./classe.component";
import { ClasseListByProfesseurComponent } from "./classe-list-by-professeur/classe-list-by-professeur.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ClasseComponent,
  },
];

@NgModule({
  declarations: [ClasseComponent, ClasseListByProfesseurComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasseModule {}
