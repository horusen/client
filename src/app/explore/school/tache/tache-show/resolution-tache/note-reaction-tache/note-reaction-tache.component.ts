import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ReactionResolutionTacheService } from "../resolution-tache/reaction-resolution-tache.service";

@Component({
  selector: "app-note-reaction-tache",
  templateUrl: "./note-reaction-tache.component.html",
  styleUrls: ["./note-reaction-tache.component.scss"],
})
export class NoteReactionTacheComponent implements OnInit {
  @Input() reaction: any;
  loading: boolean = false;
  allowEdit: boolean = false;
  showNoteError: boolean = false;
  note: number;
  constructor(public reactionService: ReactionResolutionTacheService) {}

  ngOnInit(): void {
    this.note = this.reaction.note;
    console.log(this.reaction);
  }

  noter() {
    this.showNoteError = false;
    if (typeof this.note == "number" && this.note >= 0 && this.note <= 20) {
      this.loading = true;
      if (this.reaction.note) {
        this.reactionService
          .modifierNote(this.reaction.id, this.note)
          .subscribe(() => {
            this.loading = false;
            this.allowEdit = false;
          });
      } else {
        this.reactionService
          .noter(this.reaction.id, this.note)
          .subscribe(() => {
            this.loading = false;
            this.allowEdit = false;
          });
      }
    } else {
      this.showNoteError = true;
    }
  }
}
