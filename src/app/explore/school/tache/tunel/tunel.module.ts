import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TunelComponent } from "./tunel.component";
import { TunelListComponent } from "./tunel-list/tunel-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { TunelCreateComponent } from "./tunel-create/tunel-create.component";
import { ReactionTunelComponent } from "./reaction-tunel/reaction-tunel.component";
import { ReactionTunelListComponent } from "./reaction-tunel/reaction-tunel-list/reaction-tunel-list.component";
import { ReactionTunelCreateComponent } from "./reaction-tunel/reaction-tunel-create/reaction-tunel-create.component";
import { ReactionTunelSoloComponent } from "./reaction-tunel/reaction-tunel-solo/reaction-tunel-solo.component";
import { ParticipantTunelComponent } from "./participant-tunel/participant-tunel.component";
import { ParticipantTunelListComponent } from "./participant-tunel/participant-tunel-list/participant-tunel-list.component";
import { TunelListMinComponent } from "./tunel-list-min/tunel-list-min.component";

@NgModule({
  declarations: [
    TunelComponent,
    TunelListComponent,
    TunelCreateComponent,
    ReactionTunelComponent,
    ReactionTunelListComponent,
    ReactionTunelCreateComponent,
    ReactionTunelSoloComponent,
    ParticipantTunelComponent,
    ParticipantTunelListComponent,
    TunelListMinComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    TunelComponent,
    TunelCreateComponent,
    ReactionTunelComponent,
    TunelListMinComponent,
  ],
})
export class TunelModule {}
