import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereFonctionComponent } from "./ministere-fonction.component";
import { RouterModule, Routes } from "@angular/router";
import { FonctionShowComponent } from "../../fonction/fonction-show/fonction-show.component";
import { FonctionDescriptionComponent } from "../../fonction/fonction-show/fonction-description/fonction-description.component";
import { FonctionEmployeComponent } from "../../fonction/fonction-show/fonction-employe/fonction-employe.component";
import { FonctionModule } from "../../fonction/fonction.module";

const routes: Routes = [
  {
    path: "",
    component: MinistereFonctionComponent,
  },
  {
    path: ":id",
    component: FonctionShowComponent,
    children: [
      { path: "", component: FonctionDescriptionComponent },
      { path: "employe", component: FonctionEmployeComponent },
    ],
  },
];

@NgModule({
  declarations: [MinistereFonctionComponent],
  imports: [CommonModule, FonctionModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinistereFonctionModule {}
