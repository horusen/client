import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ChargerCommunicationEtablissementService } from "../etablissement/admin-etablissement/charger-communication-etablissement/charger-communication-etablissement.service";
import { EtablissementService } from "../etablissement/etablissement.service";
import { DiscussionService } from "./discussion.service";

@Component({
  selector: "app-discussion",
  templateUrl: "./discussion.component.html",
  styleUrls: ["./discussion.component.scss"],
})
export class DiscussionComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  modulePathsRegex = {
    // Regex correspondant aux differents modules qui utilise discussion
    // Son but est d'afficher sujet ou dernières discussion suivant le module approprié
    "explore-professeur": new RegExp("school/professeur/explore"),
    "administration-etablissement": new RegExp(
      "school/administration/[0-9]+/explore"
    ),
    groupe: new RegExp("./tribune"),
    "explore-reseaux": new RegExp("school/reseaux/[0-9]+/sous-reseau/[0-9]+"),
  };

  @Input() parent: string = "";
  type_discussion: any;
  discussion: any;
  displayAssets: boolean = true;

  constructor(
    public discussionService: DiscussionService,
    public route: ActivatedRoute,
    public router: Router,
    public chargerComService: ChargerCommunicationEtablissementService,
    public etablissementService: EtablissementService
  ) {
    super(discussionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["type_discussion"]) {
        this.checkDiscussionByQueryParams(params);
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.discussionService.singleData = null;
  }

  checkDiscussion(
    type_discussion: number,
    idTypeDiscussion: number,
    correspondant?: number
  ) {
    this.discussionService
      .getDiscussion(type_discussion, idTypeDiscussion, correspondant)
      .subscribe((discussion) => {});
  }

  checkDiscussionByQueryParams(params: any) {
    // Correspondance
    if (
      (params["type_discussion"] == "correspondance" ||
        params["type_discussion"] == "professeur") &&
      params["correspondant"]
    ) {
      this.type_discussion = "correspondance";
      this.checkDiscussion(1, params["correspondant"]);
    }
    // membre administration
    else if (
      params["type_discussion"] == "membre-administration" &&
      params["membre-administration"]
    ) {
      this.checkDiscussion(1, params["membre-administration"]);
      this.type_discussion = "correspondance";
    } else if (
      params["type_discussion"] == "professeur" &&
      params["professeur"]
    ) {
      this.type_discussion = "professeur";
      this.checkDiscussion(1, params["professeur"]);
    } else if (
      (params["type_discussion"] == "groupe" ||
        params["type_discussion"] == "groupe-professeur" ||
        params["type_discussion"] == "groupe-independant") &&
      params["groupe"]
    ) {
      this.type_discussion = "groupe";
      this.checkDiscussion(4, params["sujet"]);
    } else if (
      params["type_discussion"] == "sous-reseaux" &&
      params["sous-reseaux"]
    ) {
      this.type_discussion = "sous-reseau";
      this.checkDiscussion(3, params["sous-reseaux"]);
    } else if (params["type_discussion"] == "sujet" && params["sujet"]) {
      this.type_discussion == "sujet";
      this.checkDiscussion(4, +params["sujet"]);
    }
    // Discussion etablissement
    else if (
      params["type_discussion"].includes("etablissement") &&
      params["etablissement"]
    ) {
      this.type_discussion = "etablissement";
      this.checkDiscussion(
        5,
        +params["etablissement"],
        +params["correspondant"]
      );
    } else if (
      params["type_discussion"] == "service_etablissement" &&
      params["service_etablissement"]
    ) {
      this.checkDiscussion(6, +params["service_etablissement"]);
    } else if (params["type_discussion"] == "groupe" && params["sujet"]) {
      this.checkDiscussion(4, +params["sujet"]);
    }
  }
}
