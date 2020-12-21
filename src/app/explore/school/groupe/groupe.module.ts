import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupeComponent } from "./groupe.component";
import { GroupeListComponent } from "./groupe-list/groupe-list.component";
import { Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { GroupeCreateComponent } from "./groupe-create/groupe-create.component";
import { GroupeShowModule } from "./groupe-show/groupe-show.module";
import { GroupeSoloComponent } from "./groupe-solo/groupe-solo.component";
import { GroupeClasseListComponent } from "./groupe-classe-list/groupe-classe-list.component";
import { GroupeListByProfesseurComponent } from "./groupe-list-by-professeur/groupe-list-by-professeur.component";
import { GroupeIndependantListComponent } from "./groupe-independant-list/groupe-independant-list.component";

const routes: Routes = [
  {
    path: "",
    component: GroupeComponent,
  },
  // show
  {
    path: ":id",
    component: GroupeComponent,
  },
  // {
  //   path: "details",
  //   loadChildren: () =>
  //     import("./groupe-show/groupe-show.module").then(
  //       (module) => module.GroupeShowModule
  //     ),
  // },
];

@NgModule({
  declarations: [
    GroupeComponent,
    GroupeListComponent,
    GroupeSoloComponent,
    GroupeCreateComponent,
    GroupeClasseListComponent,
    GroupeListByProfesseurComponent,
    GroupeIndependantListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    GroupeShowModule,
  ],
  exports: [RouterModule],
})
export class GroupeModule {}
