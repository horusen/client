import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZentalPasserelleComponent } from "./zental-passerelle.component";
import { SharedModule } from "src/app/shared/shared.module";
import { PasserelleModule } from "../passerelle/passerelle.module";
import { PasserelleShowComponent } from "../passerelle/passerelle-show/passerelle-show.component";
import { PasserelleDescriptionComponent } from "../passerelle/passerelle-description/passerelle-description.component";

const routes: Routes = [
  {
    path: "",
    component: ZentalPasserelleComponent,
  },
  {
    path: ":id",
    component: PasserelleShowComponent,
    children: [
      {
        path: "services",
        loadChildren: () =>
          import(
            "./../passerelle/passerelle-service/passerelle-service.module"
          ).then((module) => module.PasserelleServiceModule),
      },
      { path: "", redirectTo: "services" },
    ],
  },
];

@NgModule({
  declarations: [ZentalPasserelleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    PasserelleModule,
  ],
  exports: [RouterModule],
})
export class ZentalPasserelleModule {}
