import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TacheShowComponent } from "./tache-show.component";
import { Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TacheDetailsComponent } from "./tache-details/tache-details.component";
import { SharedTacheModuleModule } from "../shared-tache-module/shared-tache-module.module";
import { TacheDetailsInfoComponent } from "./tache-details-info/tache-details-info.component";
import { TacheMemeCategorieComponent } from "./tache-meme-categorie/tache-meme-categorie.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "school",
  },
  {
    path: ":id",
    component: TacheShowComponent,
    children: [
      // Details
      {
        path: "",
        component: TacheDetailsComponent,
        children: [
          { path: "", redirectTo: "details" },
          { path: "details", component: TacheDetailsInfoComponent },
          {
            path: "correction",
            loadChildren: () =>
              import("./../correction-tache/correction-tache.module").then(
                (module) => module.CorrectionTacheModule
              ),
          },
          {
            path: "related",
            component: TacheMemeCategorieComponent,
          },
        ],
      },
      // Correction
      {
        path: "correction",
        loadChildren: () =>
          import("./../correction-tache/correction-tache.module").then(
            (module) => module.CorrectionTacheModule
          ),
      },

      // resolution
      {
        path: "resolution",
        loadChildren: () =>
          import("./resolution-tache/resolution-tache.module").then(
            (module) => module.ResolutionTacheModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [
    TacheShowComponent,
    TacheDetailsComponent,
    TacheDetailsInfoComponent,
    TacheMemeCategorieComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedTacheModuleModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TacheShowModule {}
