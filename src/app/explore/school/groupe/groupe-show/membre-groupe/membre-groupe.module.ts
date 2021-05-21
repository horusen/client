import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MembreGroupeComponent } from "./membre-groupe.component";
import { MembreGroupeListComponent } from "./membre-groupe-list/membre-groupe-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MembreGroupeAddComponent } from "./membre-groupe-add/membre-groupe-add.component";
import { MembreGroupeSoloComponent } from "./membre-groupe-solo/membre-groupe-solo.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedSchoolModule } from "../../../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: "",
    component: MembreGroupeComponent,
  },
];

@NgModule({
  declarations: [
    MembreGroupeComponent,
    MembreGroupeListComponent,
    MembreGroupeAddComponent,
    MembreGroupeSoloComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    SharedSchoolModule,
  ],
  exports: [MembreGroupeComponent, RouterModule],
})
export class MembreGroupeModule {}
