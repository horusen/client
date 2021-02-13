import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ChargerCommunicationEtablissementService } from "../../etablissement/admin-etablissement/charger-communication-etablissement/charger-communication-etablissement.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ReactionService } from "../reaction.service";

@Component({
  selector: "app-reaction-list",
  templateUrl: "./reaction-list.component.html",
  styleUrls: ["./reaction-list.component.scss"],
})
export class ReactionListComponent extends BaseComponent implements OnInit {
  @Input() type: string;
  @Input() parentID: number;
  minified: boolean;
  constructor(
    public reactionService: ReactionService,
    public etablissementService: EtablissementService,
    public chargerComService: ChargerCommunicationEtablissementService,
    public router: Router
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    console.log(this.auth.user);
    this.router.url.includes("discussion-min")
      ? (this.minified = true)
      : (this.minified = false);


    if (this.type == "discussion") {
      

      // Charger les charger de com quand le user se positionne dans administration(echo)
      if(this.router.url.includes('school/echo/administration')) {
        this._subscription['etablissement'] = this.etablissementService.singleData$.subscribe(etablissement => {
          if(!this.chargerComService.data.length) {
           this.chargerComService.getByEtablissement(etablissement.id).subscribe();
           this.getByReaction(this.parentID);
          } else {
            this.getByReaction(this.parentID);
          }
        })
      }
    }
  }

  getByReaction(discussion: number) {
    this.loading = true;
    this.reactionService.getByDiscussion(discussion).subscribe(() => {
      this.loading = false;
    });
  }
}
