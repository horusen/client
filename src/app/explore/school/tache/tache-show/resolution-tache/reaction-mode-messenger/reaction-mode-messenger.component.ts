import { Component, OnInit } from "@angular/core";
import { ReactionResolutionTacheService } from "../resolution-tache/reaction-resolution-tache.service";

@Component({
  selector: "app-reaction-mode-messenger",
  templateUrl: "./reaction-mode-messenger.component.html",
  styleUrls: ["./reaction-mode-messenger.component.scss"],
})
export class ReactionModeMessengerComponent implements OnInit {
  constructor(public reactionService: ReactionResolutionTacheService) {}

  ngOnInit(): void {}
}
