import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/authentification/auth.service";
import { ChargerCommunicationEtablissementService } from "../../etablissement/admin-etablissement/charger-communication-etablissement/charger-communication-etablissement.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { DiscussionComponent } from "../discussion.component";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-min",
  templateUrl: "./discussion-min.component.html",
  styleUrls: ["./discussion-min.component.scss"],
})
export class DiscussionMinComponent
  extends DiscussionComponent
  implements OnInit, AfterViewInit
{
  showReactions = {
    tunel: false,
    discussion: false,
  };
  constructor(
    public discussionService: DiscussionService,
    public route: ActivatedRoute,
    public router: Router,
    public auth: AuthService,
    public chargerComService: ChargerCommunicationEtablissementService,
    public etablissementService: EtablissementService
  ) {
    super(
      discussionService,
      route,
      router,
      chargerComService,
      etablissementService
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["modal"] && params["modal"] == "discussion-min") {
        this.helper.showModal("discussion-min-modal");
      }

      if (params["type_discussion"]) {
        this.resetShowReaction();
        params["type_discussion"] === "tunel"
          ? (this.showReactions.tunel = true)
          : (this.showReactions.discussion = true);
        console.log(this.showReactions);
      }
    });
  }

  resetShowReaction() {
    Object.keys(this.showReactions).forEach((key) => {
      this.showReactions[key] = false;
    });
  }
}
