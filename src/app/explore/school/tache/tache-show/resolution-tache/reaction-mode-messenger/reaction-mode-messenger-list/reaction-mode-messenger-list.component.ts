import { ReactionResolutionTacheService } from "./../../resolution-tache/reaction-resolution-tache.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "../../../../tache.service";
import { AuthService } from "src/app/authentification/auth.service";
import { AffectationTacheService } from "../../../../affectation-tache/affectation-tache.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reaction-mode-messenger-list",
  templateUrl: "./reaction-mode-messenger-list.component.html",
  styleUrls: ["./reaction-mode-messenger-list.component.scss"],
})
export class ReactionModeMessengerListComponent
  extends BaseComponent
  implements OnInit {
  parentUrl: string;
  constructor(
    public reactionService: ReactionResolutionTacheService,
    public affectationTacheService: AffectationTacheService,
    public auth: AuthService,
    public router: Router
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription[
      "affectationTache"
    ] = this.affectationTacheService.singleData$.subscribe(
      (affectationTache) => {
        if (affectationTache.id != this.reactionService.affectationTache?.id) {
          this.reactionService.affectationTache = affectationTache;
          this.getData(affectationTache.id);
        }
      }
    );

    this.parentUrl = this.router.url.includes("suivie") ? "suivie" : "tache";
  }

  getData(affectationTache: number) {
    this.loading = true;
    this.reactionService.getReaction(affectationTache).subscribe(() => {
      this.loading = false;
    });
  }
}
