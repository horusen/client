import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadePasserelleComponent } from "./ambassade-passerelle.component";
import { PasserelleModule } from "../../passerelle/passerelle.module";

const routes: Routes = [
  {
    path: "",
    component: AmbassadePasserelleComponent,
  },
];

@NgModule({
  declarations: [AmbassadePasserelleComponent],
  imports: [CommonModule, PasserelleModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbassadePasserelleModule {}
