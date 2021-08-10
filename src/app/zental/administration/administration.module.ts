import { AmbassadeModule } from "./../ambassade/ambassade.module";
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
        path: "ambassade",
        loadChildren: () =>
          import("./../ambassade/ambassade.module").then(
            (module) => module.AmbassadeModule
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
