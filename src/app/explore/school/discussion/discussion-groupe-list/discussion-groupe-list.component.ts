import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { GroupeListComponent } from "../../groupe/groupe-list/groupe-list.component";
import { GroupeService } from "../../groupe/groupe.service";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-groupe-list",
  templateUrl: "./discussion-groupe-list.component.html",
  styleUrls: ["./discussion-groupe-list.component.scss"],
})
export class DiscussionGroupeListComponent
  extends GroupeListComponent
  implements OnInit {
  currentGroupe: number; // stock le groupe selectionné
  constructor(
    public groupeService: GroupeService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute,
    public router: Router,
    public etablissementService: EtablissementService
  ) {
    super(groupeService, router, etablissementService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.queryParams.subscribe((params) => {
      if (params["groupe"]) {
        this.currentGroupe = params["groupe"];
      }
    });
  }

  checkDiscussion(groupe: number) {
    this.discussionService.getDiscussion(2, groupe).subscribe();
  }
}
