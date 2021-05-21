import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiscussionService } from "../../discussion/discussion.service";
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

  discussion: any;
  minified: boolean;
  displayAssets: boolean = true;
  constructor(
    public reactionService: ReactionService,
    public discussionService: DiscussionService,
    public etablissementService?: EtablissementService,
    public chargerComService?: ChargerCommunicationEtablissementService
  ) {
    super(reactionService);
  }

  ngOnInit(): void {
    if (this.type == "discussion") {
      this._subscription[
        "discussion"
      ] = this.discussionService.singleData$.subscribe((discussion) => {
        this.discussion = discussion;
        this.getByDiscussion(discussion.id);
      });
    }
  }

  getByDiscussion(discussion: number) {
    this.loading = true;
    this.reactionService.getByDiscussion(discussion).subscribe(() => {
      this.loading = false;
    });
  }

  isChargerCommunication(user: number) {
    return this.chargerComService.data
      .map((chargerCom) => chargerCom.charger_com_details.id_inscription)
      .includes(user);
  }
}
