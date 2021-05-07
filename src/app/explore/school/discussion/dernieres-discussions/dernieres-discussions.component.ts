import { ReactionService } from "./../../reaction/reaction.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { DiscussionService } from "../discussion.service";
import { ProfesseurService } from "../../professeur/professeur.service";
import { AuthService } from "src/app/authentification/auth.service";

@Component({
  selector: "app-dernieres-discussions",
  templateUrl: "./dernieres-discussions.component.html",
  styleUrls: ["./dernieres-discussions.component.scss"],
})
export class DernieresDiscussionsComponent
  extends BaseComponent
  implements OnInit {
  type_discussion: string;
  modulePathsRegex = {
    // Regex correspondant aux differents modules qui utilise dernieres discussiob
    // Son but est de selectionner par defaut l'onglet appropprié
    "explore-professeur": new RegExp("school/professeur/explore"),
    "administration-etablissement": new RegExp(
      "school/administration/[0-9]+/explore"
    ),
  };
  constructor(
    public discussionService: DiscussionService,
    public etablissementService: EtablissementService,
    public professeurService: ProfesseurService,
    public reactionService: ReactionService,
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(discussionService);
  }

  ngOnInit(): void {
    // derniers Discussion recupéré depuis discussion
    this.route.queryParams.subscribe((queryParams) => {
      // Selection un onglet par defaut si besoin
      if (!queryParams.type_discussion) {
        this.selectDefaultTab();
      }

      // Recuperations des données depuis le server
      if (queryParams.type_discussion != this.type_discussion) {
        this.getData(queryParams.type_discussion);
      }
    });

    this._subscription[
      "reaction"
    ] = this.reactionService.lastItemcreated$.subscribe((reaction) => {
      const indexDiscussion = this.discussionService.findIndexItemInDataByID(
        this.discussionService.singleData.id
      );
      this.discussionService.data[indexDiscussion].derniereReaction = reaction;
    });
  }
  // Permet de selectionner un onglet par defaut
  selectDefaultTab() {
    if (this.router.url.match(this.modulePathsRegex["explore-professeur"])) {
      this.router.navigate(["./"], {
        queryParams: { type_discussion: "professeur" },
        relativeTo: this.route.parent,
      });
    } else if (
      this.router.url.match(
        this.modulePathsRegex["administration-etablissement"]
      )
    ) {
      this.router.navigate(["./"], {
        queryParams: { type_discussion: "correspondance-interne" },
        relativeTo: this.route.parent,
      });
    }
  }

  getData(type_discussion: string) {
    // Discussion type etablissement
    if (type_discussion === "etablissement") {
      this.router.navigate(["./"], {
        relativeTo: this.route,
        queryParams: { type_discussion: "etablissement-interne" },
      });
    }
    // Discussion type professeur
    else if (type_discussion == "professeur") {
      this.type_discussion = "professeur";
      this.getByProfesseur();
    }
    // Discussion type employé
    else if (type_discussion == "administration") {
      this.type_discussion = "administration";
      this.getByMembreAdministration();
    }
    // Discussion type etablissement
    else if (
      type_discussion.split("-")[0] == "etablissement" &&
      (type_discussion.split("-")[1] === "interne" ||
        type_discussion.split("-")[1] === "externe")
    ) {
      this.type_discussion = type_discussion;
      this.getByEtablissement(type_discussion.split("-")[1]);
    }
  }

  getByProfesseur() {
    this.loading = true;
    this.discussionService.getDernieresDiscussionsProfesseur().subscribe(() => {
      this.loading = false;
    });
  }

  getByMembreAdministration() {
    this.loading = true;
    this.discussionService
      .getDernieresDiscussionsAdministration(
        this.auth.selectedProfile.etablissement
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByEtablissement(positionnement: string) {
    this.etablissementService.singleData$.subscribe((etablissement) => {
      this.loading = true;
      this.discussionService
        .getDernieresDiscussionsEtablissement(etablissement.id, positionnement)
        .subscribe(() => {
          this.loading = false;
        });
    });
  }
  // getByEtablissementExterne() {
  //   this.etablissementService.singleData$.subscribe((etablissement) => {
  //     this.loading = true;
  //     this.discussionService
  //       .getDernieresDiscussionsExternesEtablissement(etablissement.id)
  //       .subscribe(() => {
  //         this.loading = false;
  //       });
  //   });
  // }
}
