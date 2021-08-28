import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatPosteComponent } from "./consulat-poste.component";
import { RouterModule, Routes } from "@angular/router";
import { PosteModule } from "../../poste/poste.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatPosteComponent,
  },
];

@NgModule({
  declarations: [ConsulatPosteComponent],
  imports: [CommonModule, PosteModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatPosteModule {}
