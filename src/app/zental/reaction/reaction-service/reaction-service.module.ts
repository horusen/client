import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ReactionServiceComponent } from "./reaction-service.component";
import { ReactionServiceListComponent } from "./reaction-service-list/reaction-service-list.component";
import { SharedReactionModule } from "../shared-reaction/shared-reaction.module";
import { ReactionServiceCreateComponent } from './reaction-service-create/reaction-service-create.component';

@NgModule({
  declarations: [ReactionServiceComponent, ReactionServiceListComponent, ReactionServiceCreateComponent],
  imports: [CommonModule, SharedModule, SharedReactionModule],
  exports: [ReactionServiceComponent],
})
export class ReactionServiceModule {}
