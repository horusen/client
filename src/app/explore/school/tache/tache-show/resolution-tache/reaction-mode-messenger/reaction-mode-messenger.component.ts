import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { ReactionResolutionTacheService } from "../resolution-tache/reaction-resolution-tache.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reaction-mode-messenger",
  templateUrl: "./reaction-mode-messenger.component.html",
  styleUrls: ["./reaction-mode-messenger.component.scss"],
})
export class ReactionModeMessengerComponent implements OnInit {
  loading: boolean;
  loadingSubscription: Subscription;
  constructor(public reactionService: ReactionResolutionTacheService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.reactionService.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
  }
}
