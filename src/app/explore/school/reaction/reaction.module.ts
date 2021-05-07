import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactionComponent } from "./reaction.component";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedSchoolModule } from "../shared-school/shared-school.module";
import { ReactionListComponent } from "./reaction-list/reaction-list.component";
import { ReactionSoloComponent } from "./reaction-list/reaction-solo/reaction-solo.component";
import { ReactionCreateComponent } from "./reaction-create/reaction-create.component";
import { AssetDiscussionModule } from "../discussion/asset-discussion/asset-discussion.module";

@NgModule({
  declarations: [
    ReactionComponent,
    ReactionListComponent,
    ReactionSoloComponent,
    ReactionCreateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedSchoolModule,
    AssetDiscussionModule,
  ],
  exports: [
    ReactionComponent,
    ReactionListComponent,
    ReactionSoloComponent,
    ReactionCreateComponent,
  ],
})
export class ReactionModule {}
