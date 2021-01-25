import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SousReseauxComponent } from "./sous-reseaux.component";
import { SousReseauxListComponent } from "./sous-reseaux-list/sous-reseaux-list.component";
import { SousReseauxShowComponent } from "./sous-reseaux-show/sous-reseaux-show.component";
import { SharedSchoolModule } from "../../shared-school/shared-school.module";
import { SharedModule } from "src/app/shared/shared.module";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SousReseauxComponent,
    children: [
      // Show
      {
        path: ":id",
        component: SousReseauxShowComponent,
        children: [
          {
            path: "",
            loadChildren: () =>
              import(
                "./discussion-sous-reseaux/discussion-sous-reseaux.module"
              ).then((module) => module.DiscussionSousReseauxModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    SousReseauxComponent,
    SousReseauxListComponent,
    SousReseauxShowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SousReseauxModule {}
