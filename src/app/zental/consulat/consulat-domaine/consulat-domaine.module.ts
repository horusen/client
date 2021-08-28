import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatDomaineComponent } from "./consulat-domaine.component";
import { RouterModule, Routes } from "@angular/router";
import { DomaineModule } from "../../domaine/domaine.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatDomaineComponent,
  },
];

@NgModule({
  declarations: [ConsulatDomaineComponent],
  imports: [CommonModule, DomaineModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatDomaineModule {}
