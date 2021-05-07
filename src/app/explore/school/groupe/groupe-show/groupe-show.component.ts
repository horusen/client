import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { DemandeAdhesionGroupeService } from "../demande-adhesion-groupe.service";
import { GroupeService } from "../groupe.service";

@Component({
  selector: "app-groupe-show",
  templateUrl: "./groupe-show.component.html",
  styleUrls: ["./groupe-show.component.scss"],
})
export class GroupeShowComponent extends BaseSingleComponent implements OnInit {
  urlRedirectionVersDiscussionFragement: string[]; // Redirige vers la partie discussion: vu que discussion est appréhender differement selon les modules, l'url va varier en fonction de ce dernier
  urlRedirectionVersDiscussionFragementQueryParams: any;
  rejoindreGroupeLoading: boolean = false;
  showDemandeAdhesion: boolean = false;
  constructor(
    public groupeService: GroupeService,
    public demandeAdhesionGroupeService: DemandeAdhesionGroupeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(groupeService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();

    this._subscription["groupe"] = this.groupeService.singleData$.subscribe(
      () => {
        this.setUrlRedirectionVersDiscussion();
      }
    );
  }

  setUrlRedirectionVersDiscussion() {
    if (this.router.url.includes("school/professeur")) {
      this.urlRedirectionVersDiscussionFragement = [
        "/",
        "school",
        "professeur",
        "explore",
      ];
      this.urlRedirectionVersDiscussionFragementQueryParams = {
        type_discussion: "groupe-professeur",
        groupe: this.single.id,
      };
    } else if (this.router.url.includes("school/groupe-independant")) {
      this.urlRedirectionVersDiscussionFragement = [
        "/",
        "school",
        "groupe-independant",
        "explore",
      ];

      this.urlRedirectionVersDiscussionFragementQueryParams = {
        type_discussion: "groupe-independant",
        groupe: this.single.id,
      };
    }
  }

  rejoindreGroupe() {
    this.helper.alertConfirmation(() => {
      this.rejoindreGroupeLoading = true;
      this.groupeService
        .rejoindreGroupe({
          groupe: this.single.id,
          membre: this.auth.user.id_inscription,
        })
        .subscribe(() => {
          this.helper.alertSuccess();
          this.rejoindreGroupeLoading = false;
        });
    });
  }

  faireUneDemandeDAdhesion() {
    this.helper.alertConfirmation(() => {
      this.rejoindreGroupeLoading = true;
      this.demandeAdhesionGroupeService
        .faireUneDemande(this.single.id)
        .subscribe(() => {
          this.rejoindreGroupeLoading = false;
          this.single.user_has_demande = true;
        });
    });
  }

  annulerDemandeDAdhesion() {
    this.helper.alertConfirmation(() => {
      this.rejoindreGroupeLoading = true;
      this.demandeAdhesionGroupeService
        .annulerDemande(this.single.id)
        .subscribe(() => {
          this.rejoindreGroupeLoading = false;
          this.single.user_has_demande = false;
        });
    });
  }
}
