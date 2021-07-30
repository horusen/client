import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministrationComponent } from "./administration.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    children: [
      {
        path: "ministere",
        loadChildren: () =>
          import("./../ministere/ministere.module").then(
            (module) => module.MinistereModule
          ),
      },
      {
        path: "**",
        redirectTo: "ministere",
      },
    ],
  },
];

@NgModule({
  declarations: [AdministrationComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationModule {}
