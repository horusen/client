import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TacheGroupeComponent } from "./tache-groupe.component";
import { TacheGroupeListComponent } from "./tache-groupe-list/tache-groupe-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AffecterTacheByGroupeComponent } from "./affecter-tache-by-groupe/affecter-tache-by-groupe.component";
import { SharedSchoolModule } from "../../../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: TacheGroupeComponent,
  },
];


@NgModule({
  declarations: [
    TacheGroupeComponent,
    TacheGroupeListComponent,
    AffecterTacheByGroupeComponent,
  ],
  imports: [CommonModule, SharedModule, SharedSchoolModule, RouterModule.forChild(routes)],
  exports: [TacheGroupeComponent, RouterModule],
})
export class TacheGroupeModule { }
