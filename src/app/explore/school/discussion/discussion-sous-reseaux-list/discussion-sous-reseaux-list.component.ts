import { SousReseauxListMinComponent } from "./../../shared-school/sous-reseaux-list-min/sous-reseaux-list-min.component";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SousDomaineService } from "../../sous-domaine/sous-domaine.service";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-sous-reseaux-list",
  templateUrl: "./discussion-sous-reseaux-list.component.html",
  styleUrls: ["./discussion-sous-reseaux-list.component.scss"],
})
export class DiscussionSousReseauxListComponent
  extends SousReseauxListMinComponent
  implements OnInit {
  currentSousReseaux: number;
  constructor(
    public sousDomaineService: SousDomaineService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(sousDomaineService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      if (params["sous-reseaux"]) {
        this.currentSousReseaux = params["sous-reseaux"];
      }
    });
  }
}
