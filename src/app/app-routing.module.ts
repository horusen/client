import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "school",
    loadChildren: () =>
      import("./explore/school/school.module").then(
        (module) => module.SchoolModule
      ),
  },
  { path: "**", redirectTo: "school" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
