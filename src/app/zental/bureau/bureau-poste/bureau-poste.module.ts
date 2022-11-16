import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauPosteComponent } from "./bureau-poste.component";
import { RouterModule, Routes } from "@angular/router";
import { PosteShowComponent } from "../../poste/poste-show/poste-show.component";
import { PosteDescriptionComponent } from "../../poste/poste-show/poste-description/poste-description.component";
import { PosteEmployeComponent } from "../../poste/poste-show/poste-employe/poste-employe.component";
import { PosteModule } from "../../poste/poste.module";

const routes: Routes = [
  {
    path: "",
    component: BureauPosteComponent,
  },
  {
    path: ":id",
    component: PosteShowComponent,
    children: [
      { path: "", component: PosteDescriptionComponent },
      { path: "employe", component: PosteEmployeComponent },
    ],
  },
];

@NgModule({
  declarations: [BureauPosteComponent],
  imports: [CommonModule, PosteModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BureauPosteModule {}
