import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedZentalModule } from "../../shared-zental/shared-zental.module";
import { SharedModule } from "src/app/shared/shared.module";
import { TolobaServiceComponent } from "./toloba-service.component";
import { RouterModule, Routes } from "@angular/router";
import { DernieresDiscussionsModule } from "../discussion/dernieres-discussions/dernieres-discussions.module";

const routes: Routes = [
  {
    path: "",
    component: TolobaServiceComponent,
    children: [
      {
        path: "discussion",
        loadChildren: () =>
          import(
            "../discussion/discussion-service/discussion-service.module"
          ).then((module) => module.DiscussionServiceModule),
      },
    ],
  },
];

@NgModule({
  declarations: [TolobaServiceComponent],
  imports: [
    CommonModule,
    SharedZentalModule,
    DernieresDiscussionsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class TolobaServiceModule {}
