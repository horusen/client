import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { DernieresDiscussionsComponent } from "./dernieres-discussions.component";
import { DernieresDiscussionsSoloComponent } from './dernieres-discussions-solo/dernieres-discussions-solo.component';

@NgModule({
  declarations: [DernieresDiscussionsComponent, DernieresDiscussionsSoloComponent],
  imports: [CommonModule, SharedModule],
  exports: [DernieresDiscussionsComponent],
})
export class DernieresDiscussionsModule {}
