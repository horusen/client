import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ProfilComponent } from "./profil.component";
import { ProfilListByHierarchieComponent } from "./profil-list-by-hierarchie/profil-list-by-hierarchie.component";
import { ProfilCreateComponent } from "./profil-create/profil-create.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";

const routes: Routes = [
  {
    path: ":id",
    component: ProfilComponent,
  },
  {
    path: "",
    redirectTo: "../",
  },
];

@NgModule({
  declarations: [
    ProfilComponent,
    ProfilListByHierarchieComponent,
    ProfilCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ProfilModule {}
