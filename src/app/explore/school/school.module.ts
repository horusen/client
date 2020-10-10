import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SchoolComponent } from "./school.component";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: SchoolComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./explore-school/explore-school.module").then(
            (module) => module.ExploreSchoolModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [SchoolComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolModule {}
