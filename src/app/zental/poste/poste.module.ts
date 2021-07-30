import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { PosteComponent } from "./poste.component";
import { PosteListComponent } from "./poste-list/poste-list.component";
import { PosteEditComponent } from "./poste-edit/poste-edit.component";
import { SharedZentalModule } from "../shared-zental/shared-zental.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: PosteComponent,
  },
];

@NgModule({
  declarations: [PosteComponent, PosteListComponent, PosteEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedZentalModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PosteModule {}
