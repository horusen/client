import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../../groupe/groupe.service";
import { ReactionService } from "../../../reaction/reaction.service";
import { SousDomaineService } from "../../../sous-domaine/sous-domaine.service";
import { DiscussionService } from "../../discussion.service";
import { SujetService } from "../sujet.service";

@Component({
  selector: "app-sujet-list",
  templateUrl: "./sujet-list.component.html",
  styleUrls: ["./sujet-list.component.scss"],
})
export class SujetListComponent
  extends BaseComponent
  implements OnInit, AfterViewInit {
  constructor(
    public sujetService: SujetService,
    public route: ActivatedRoute,
    public groupeService: GroupeService,
    public sousDomaineService: SousDomaineService,
    public discussionService: DiscussionService,
    public reactionService: ReactionService
  ) {
    super(sujetService);
  }

  ngOnInit(): void {
    this._subscription[
      "reaction"
    ] = this.reactionService.lastItemcreated$.subscribe((reaction) => {
      const indexSujet = this.sujetService.findIndexItemInDataByID(
        this.discussionService.singleData.sujet.id
      );
      this.sujetService.setFieldInRowData(
        indexSujet,
        "derniereReaction",
        reaction
      );
    });
  }

  ngAfterViewInit() {
    if (this.route.snapshot.queryParams["type_discussion"] == "groupe") {
      this.groupeService.singleData$.subscribe((groupe) => {
        this.getByGroupe(groupe.id);
      });
    } else if (
      this.route.snapshot.queryParams["type_discussion"] == "sous-reseau"
    ) {
      this.sousDomaineService.singleData$.subscribe((sousDomaine) => {
        if (sousDomaine) {
          this.getBySousReseau(sousDomaine.id);
        }
      });
    }
  }

  getByGroupe(groupe: number, queryParams?: any) {
    this.loading = true;
    this.sujetService.getByGroupe(groupe, queryParams).subscribe(() => {
      this.loading = false;
    });
  }

  getBySousReseau(sousReseau: number) {
    this.loading = true;
    this.sujetService.getBySousReseau(sousReseau).subscribe(() => {
      this.loading = false;
    });
  }

  fermerSujet(sujet: number) {
    this.sujetService.changerEtat(sujet, 0).subscribe(() => {
      if (this.discussionService.singleData?.sujet.id == sujet) {
        this.discussionService.singleData.sujet.etat = 0;
        this.discussionService.emitSingleData();
      }
    });
  }

  reouvrirSujet(sujet: number) {
    this.sujetService.changerEtat(sujet, 1).subscribe(() => {
      if (this.discussionService.singleData?.sujet.id == sujet) {
        this.discussionService.singleData.sujet.etat = 0;
        this.discussionService.emitSingleData();
      }
    });
  }

  edit(sujet: any) {
    this.sujetService.singleData = sujet;
    this.helper.toggleModal("sujet-edit-modal");
  }
}
