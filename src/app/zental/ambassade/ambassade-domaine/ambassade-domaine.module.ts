import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeDomaineComponent } from "./ambassade-domaine.component";
import { DomaineModule } from "../../domaine/domaine.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadeDomaineComponent,
  },
];

@NgModule({
  declarations: [AmbassadeDomaineComponent],
  imports: [CommonModule, DomaineModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadeDomaineModule {}
