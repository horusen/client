import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalComponent } from "./zental.component";
import { RouterModule, Routes } from "@angular/router";
import { TemplateComponent } from "./template/template.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: ZentalComponent,
    children: [
      {
        path: "",
        component: TemplateComponent,
      },
      {
        path: "administration",
        loadChildren: () =>
          import("./administration/administration.module").then(
            (module) => module.AdministrationModule
          ),
      },
      {
        path: "identite",
        loadChildren: () =>
          import("./identite/identite.module").then(
            (module) => module.IdentiteModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [ZentalComponent, TemplateComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZentalModule {}
