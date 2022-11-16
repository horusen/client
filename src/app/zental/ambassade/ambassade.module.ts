import { InstitutionModule } from "./../institution/institution.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmbassadeComponent } from "./ambassade.component";
import { AmbassadeListComponent } from "./ambassade-list/ambassade-list.component";
import { AmbassadeEditComponent } from "./ambassade-edit/ambassade-edit.component";
import { AmbassadeShowComponent } from "./ambassade-show/ambassade-show.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { FilterAmbassadeComponent } from "./filter-ambassade/filter-ambassade.component";
import { AmbassadeDetailsComponent } from "./ambassade-show/ambassade-details/ambassade-details.component";
import { AmbassadeListContainerComponent } from "./ambassade-list-container/ambassade-list-container.component";
import { DescriptionPartielAmbassadeComponent } from "./description-partiel-ambassade/description-partiel-ambassade.component";

// const routes: Routes = [
//   {
//     path: "",
//     component: AmbassadeComponent,
//     children: [
//       {
//         path: "",
//         component: AmbassadeListContainerComponent,
//       },
//       {
//         path: ":id",
//         component: AmbassadeShowComponent,
//         children: [
//           {
//             path: "profil",
//             loadChildren: () =>
//               import("./profil-ambassade/profil-ambassade.module").then(
//                 (module) => module.ProfilAmbassadeModule
//               ),
//           },
//           {
//             path: "admin",
//             loadChildren: () =>
//               import(
//                 "./administration-ambassade/administration-ambassade.module"
//               ).then((module) => module.AdministrationAmbassadeModule),
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
    AmbassadeComponent,
    AmbassadeListComponent,
    AmbassadeEditComponent,
    AmbassadeShowComponent,
    FilterAmbassadeComponent,
    AmbassadeDetailsComponent,
    AmbassadeListContainerComponent,
    DescriptionPartielAmbassadeComponent,
  ],
  imports: [CommonModule, SharedModule, SharedZentalModule, InstitutionModule],
  exports: [
    AmbassadeComponent,
    AmbassadeShowComponent,
    AmbassadeListComponent,
    AmbassadeEditComponent,
  ],
})
export class AmbassadeModule {}
