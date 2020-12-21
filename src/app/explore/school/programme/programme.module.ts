import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgrammeComponent } from "./programme.component";
import { ProgrammeListByProfesseurComponent } from "./programme-list-by-professeur/programme-list-by-professeur.component";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ProgrammeComponent,
  },
];

@NgModule({
  declarations: [ProgrammeComponent, ProgrammeListByProfesseurComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgrammeModule {}
