import { ReactionResolutionTacheService } from "./../../resolution-tache/reaction-resolution-tache.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "../../../../tache.service";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-reaction-mode-messenger-list",
  templateUrl: "./reaction-mode-messenger-list.component.html",
  styleUrls: ["./reaction-mode-messenger-list.component.scss"],
})
export class ReactionModeMessengerListComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public reactionService: ReactionResolutionTacheService,
    public tacheService: TacheService,
    public auth: AuthService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    this._subscription["tache"] = this.tacheService.singleData$.subscribe(
      (tache) => {
        this.getData(tache.id);
      }
    );
  }

  getData(tache: number) {
    if (!this.reactionService.data.length) {
      this.loading = true;
      this.reactionService.getReaction(tache).subscribe(() => {
        this.loading = false;
      });
    }
  }
}
