import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfesseurService } from "../../professeur/professeur.service";
import { ProfesseurListMinComponent } from "../../shared-school/professeur-list-min/professeur-list-min.component";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-professeur-list",
  templateUrl: "./discussion-professeur-list.component.html",
  styleUrls: ["./discussion-professeur-list.component.scss"],
})
export class DiscussionProfesseurListComponent
  extends ProfesseurListMinComponent
  implements OnInit {
  currentProfesseur: number;
  constructor(
    public professeurService: ProfesseurService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(professeurService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      if (params["professeur"]) {
        this.currentProfesseur = params["professeur"];
      }
    });
  }

  checkDiscussion(groupe: number) {
    this.discussionService.getDiscussion(1, groupe).subscribe();
  }
}
