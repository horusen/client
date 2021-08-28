import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConsulatPasserelleComponent } from "./consulat-passerelle.component";
import { RouterModule, Routes } from "@angular/router";
import { PasserelleModule } from "../../passerelle/passerelle.module";

const routes: Routes = [
  {
    path: "",
    component: ConsulatPasserelleComponent,
  },
];

@NgModule({
  declarations: [ConsulatPasserelleComponent],
  imports: [CommonModule, PasserelleModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsulatPasserelleModule {}
