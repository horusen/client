import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BureauComponent } from "./bureau.component";
import { BureauListComponent } from "./bureau-list/bureau-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { BureauShowComponent } from "./bureau-show/bureau-show.component";
import { BureauDescriptionComponent } from "./bureau-show/bureau-description/bureau-description.component";
import { BureauEmployesComponent } from "./bureau-show/bureau-employes/bureau-employes.component";
import { EmployeModule } from "../employe/employe.module";

// const routes: Routes = [
//   {
//     path: "",
//     component: BureauComponent,
//   },
//   {
//     path: ":id",
//     component: BureauShowComponent,
//     children: [
//       { path: "", component: BureauDescriptionComponent },
//       { path: "employes", component: BureauEmployesComponent },
//     ],
//   },
// ];

@NgModule({
  declarations: [
    BureauComponent,
    BureauListComponent,
    BureauShowComponent,
    BureauDescriptionComponent,
    BureauEmployesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    EmployeModule,
    // RouterModule.forChild(routes),
  ],
  exports: [BureauComponent, BureauListComponent],
})
export class BureauModule {}
