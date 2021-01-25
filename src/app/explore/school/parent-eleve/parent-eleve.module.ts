import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ParentEleveComponent } from "./parent-eleve.component";
import { ParentEleveListByEtablissementComponent } from "./parent-eleve-list-by-etablissement/parent-eleve-list-by-etablissement.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: ParentEleveComponent,
  },
];

@NgModule({
  declarations: [ParentEleveComponent, ParentEleveListByEtablissementComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentEleveModule {}
