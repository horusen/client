import { AdministrationComponent } from "./administration.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdministrationComponent,
    children: [
      {
        path: "hierarchie",
        loadChildren: () =>
          import("./profil/profil.module").then(
            (module) => module.ProfilModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AdministrationModule {}
