import { CorrectionTacheListComponent } from "./../correction-tache/correction-tache-list/correction-tache-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GroupeTacheListComponent } from "../tache-show/tache-details/groupe-tache-list/groupe-tache-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { NoteReactionTacheComponent } from "../tache-show/resolution-tache/note-reaction-tache/note-reaction-tache.component";

@NgModule({
  declarations: [
    GroupeTacheListComponent,
    CorrectionTacheListComponent,
    NoteReactionTacheComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    GroupeTacheListComponent,
    CorrectionTacheListComponent,
    NoteReactionTacheComponent,
  ],
})
export class SharedTacheModuleModule {}
