import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TolobaEntiteDiplomatiqueComponent } from "./toloba-entite-diplomatique.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DiscussionModule } from "../discussion/discussion/discussion.module";
import { SharedTolobaModule } from "../shared-toloba/shared-toloba.module";
import { DernieresDiscussionsModule } from "../discussion/dernieres-discussions/dernieres-discussions.module";

@NgModule({
  declarations: [TolobaEntiteDiplomatiqueComponent],
  imports: [
    CommonModule,
    SharedModule,
    DiscussionModule,
    SharedTolobaModule,
    DernieresDiscussionsModule,
  ],
  exports: [TolobaEntiteDiplomatiqueComponent],
})
export class TolobaEntiteDiplomatiqueModule {}
