import { Component } from "@angular/core";
import { ReactionModeMessengerListComponent } from "../../reaction-mode-messenger/reaction-mode-messenger-list/reaction-mode-messenger-list.component";

@Component({
  selector: "app-reaction-mode-commentaire-list",
  templateUrl: "./reaction-mode-commentaire-list.component.html",
  styleUrls: ["./reaction-mode-commentaire-list.component.scss"],
})
export class ReactionModeCommentaireListComponent extends ReactionModeMessengerListComponent {}
