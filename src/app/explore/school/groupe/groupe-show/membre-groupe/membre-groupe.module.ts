import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MembreGroupeComponent } from "./membre-groupe.component";
import { MembreGroupeListComponent } from "./membre-groupe-list/membre-groupe-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MembreGroupeAddComponent } from './membre-groupe-add/membre-groupe-add.component';
import { MembreGroupeSoloComponent } from './membre-groupe-solo/membre-groupe-solo.component';
import { ChangerPrivilegeMembreGroupeeComponent } from './changer-privilege-membre-groupee/changer-privilege-membre-groupee.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: MembreGroupeComponent,
  },
];

@NgModule({
  declarations: [MembreGroupeComponent, MembreGroupeListComponent, MembreGroupeAddComponent, MembreGroupeSoloComponent, ChangerPrivilegeMembreGroupeeComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [MembreGroupeComponent, RouterModule],
})
export class MembreGroupeModule { }
