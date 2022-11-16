import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadePosteComponent } from "./ambassade-poste.component";
import { RouterModule, Routes } from "@angular/router";
import { PosteModule } from "../../poste/poste.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadePosteComponent,
  },
];

@NgModule({
  declarations: [AmbassadePosteComponent],
  imports: [CommonModule, PosteModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadePosteModule {}
