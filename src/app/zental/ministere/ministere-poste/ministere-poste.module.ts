import { PosteEmployeComponent } from "./../../poste/poste-show/poste-employe/poste-employe.component";
import { PosteDescriptionComponent } from "./../../poste/poste-show/poste-description/poste-description.component";
import { PosteShowComponent } from "./../../poste/poste-show/poste-show.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinisterePosteComponent } from "./ministere-poste.component";
import { RouterModule, Routes } from "@angular/router";
import { PosteModule } from "../../poste/poste.module";

const routes: Routes = [
  {
    path: "",
    component: MinisterePosteComponent,
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
  declarations: [MinisterePosteComponent],
  imports: [CommonModule, PosteModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinisterePosteModule {}
