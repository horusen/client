import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MinistereComponent } from "./ministere.component";
import { MinistereListComponent } from "./ministere-list/ministere-list.component";
import { MinistereShowComponent } from "./ministere-show/ministere-show.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MinistereMissingDataComponent } from "./ministere-missing-data/ministere-missing-data.component";
import { InstitutionModule } from "../institution/institution.module";
import { MinistereEditComponent } from "./ministere-edit/ministere-edit.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: MinistereComponent,
//     children: [
//       {
//         path: "",
//         component: MinistereListComponent,
//       },
//       {
//         path: ":id",
//         component: MinistereShowComponent,
//         children: [
//           {
//             path: "profil",
//             loadChildren: () =>
//               import("./profil-ministere/profil-ministere.module").then(
//                 (module) => module.ProfilMinistereModule
//               ),
//           },
//           {
//             path: "admin",
//             loadChildren: () =>
//               import(
//                 "./../administration-ministere/administration-ministere.module"
//               ).then((module) => module.AdministrationMinistereModule),
//           },
//           {
//             path: "**",
//             redirectTo: "profil",
//           },
//         ],
//       },
//     ],
//   },
// ];

@NgModule({
  declarations: [
    MinistereComponent,
    MinistereListComponent,
    MinistereShowComponent,
    MinistereMissingDataComponent,
    MinistereEditComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule, InstitutionModule],
  exports: [
    MinistereComponent,
    MinistereShowComponent,
    MinistereListComponent,
    MinistereEditComponent,
  ],
})
export class MinistereModule {}
