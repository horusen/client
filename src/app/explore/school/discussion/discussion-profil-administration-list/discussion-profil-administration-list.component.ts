import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ProfilService } from "../../administration/profil/profil.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { DiscussionService } from "../discussion.service";

@Component({
  selector: "app-discussion-profil-administration-list",
  templateUrl: "./discussion-profil-administration-list.component.html",
  styleUrls: ["./discussion-profil-administration-list.component.scss"],
})
export class DiscussionProfilAdministrationListComponent
  extends BaseComponent
  implements OnInit {
  currentMembreAdministration: number;
  constructor(
    public profilService: ProfilService,
    public etablissementService: EtablissementService,
    public discussionService: DiscussionService,
    public route: ActivatedRoute
  ) {
    super(profilService);
  }

  ngOnInit(): void {
    this.getData();

    this.route.params.subscribe((params) => {
      if (params["membre-administration"]) {
        this.currentMembreAdministration = params["membre-administration"];
      }
    });
  }

  getData() {
    this.loading = true;
    this.profilService
      .getByEtablissement(this.etablissementService.etablissement.id)
      .subscribe(() => {
        this.loading = false;
      });
  }

  checkDiscussion(user: number) {
    this.discussionService.getDiscussion(1, user).subscribe();
  }
}
