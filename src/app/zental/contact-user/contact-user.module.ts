import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactUserComponent } from "./contact-user.component";
import { ContactUserCreateComponent } from "./contact-user-create/contact-user-create.component";
import { ContactUserListComponent } from "./contact-user-list/contact-user-list.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";

const routes: Routes = [
  {
    path: "",
    component: ContactUserComponent,
  },
];

@NgModule({
  declarations: [
    ContactUserComponent,
    ContactUserCreateComponent,
    ContactUserListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ContactUserModule {}
