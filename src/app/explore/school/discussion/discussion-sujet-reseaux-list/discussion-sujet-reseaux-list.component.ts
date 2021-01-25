import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { SujetSousReseauxService } from "../../reseaux/sous-reseaux/sujet-sous-reseaux/sujet-sous-reseaux.service";
import { SousDomaineService } from "../../sous-domaine/sous-domaine.service";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-sujet-reseaux-list",
  templateUrl: "./discussion-sujet-reseaux-list.component.html",
  styleUrls: ["./discussion-sujet-reseaux-list.component.scss"],
})
export class DiscussionSujetReseauxListComponent
  extends BaseComponent
  implements OnInit {
  currentSujet: number; // stock le groupe selectionné
  constructor(
    public sujetService: SujetSousReseauxService,
    public route: ActivatedRoute,
    public discussionService: DiscussionService,
    public sousDomaineService: SousDomaineService
  ) {
    super(sujetService);
  }
  ngOnInit(): void {
    this._subscription[
      "sous_domaine"
    ] = this.sousDomaineService.singleData$.subscribe((sousDomaine) => {
      if (sousDomaine) {
        this.getData(sousDomaine.id);
      }
    });

    this.route.queryParams.subscribe((params) => {
      if (params["sujet"]) {
        this.currentSujet = params["sujet"];
      }
    });
  }

  getData(sujet: number) {
    this.loading = true;
    this.sujetService.getBySousDomaine(sujet).subscribe(() => {
      this.loading = false;
    });
  }

  checkDiscussion(sujet: number) {
    this.discussionService.getDiscussion(4, sujet).subscribe();
  }
}
