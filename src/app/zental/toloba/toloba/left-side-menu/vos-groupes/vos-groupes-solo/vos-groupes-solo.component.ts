import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DemandeAdhesionGroupeService } from "src/app/zental/groupe/demande-adhesion-groupe/demande-adhesion-groupe.service";
import { GroupeService } from "src/app/zental/groupe/groupe/groupe.service";
import { DiscussionService } from "src/app/zental/toloba/discussion/discussion/discussion.service";

@Component({
  selector: "app-vos-groupes-solo",
  templateUrl: "./vos-groupes-solo.component.html",
  styleUrls: ["./vos-groupes-solo.component.scss"],
})
export class VosGroupesSoloComponent extends BaseComponent implements OnInit {
  @Input() groupe: any;
  constructor(
    public groupeService: GroupeService,
    public discussionService: DiscussionService,
    public demandeAdhesionGroupeService: DemandeAdhesionGroupeService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {}

  getDiscussion() {
    this.loading = true;
    this.discussionService
      .check(3, this.auth.user.id_inscription, this.groupe.id)
      .subscribe((discussion) => {
        this.router.navigate([this.getUrlRedirection(discussion.id)], {
          queryParamsHandling: "preserve",
        });

        this.loading = false;
      });
  }

  faireUneDemande(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.demandeAdhesionGroupeService
        .add({ user: this.auth.user.id_inscription, groupe: this.groupe.id })
        .subscribe((demande) => {
          this.groupe.user_demande = demande;
          this.groupe.nombre_demandes += 1;
          if (this.groupeService.singleData.id === this.groupe.id) {
            this.groupeService.setFieldInSingleData("user_demande", demande);
            this.groupeService.setFieldInSingleData(
              "nombre_demandes",
              this.groupe.nombre_demandes
            );
          }
          this.loading = false;
          this.helper.alertSuccess();
        });
    });
  }

  annulerDemande(): void {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.demandeAdhesionGroupeService
        .annuler(this.groupe.user_demande?.id)
        .subscribe(() => {
          this.groupe.user_demande = null;
          this.groupe.nombre_demandes--;

          if (this.groupeService.singleData.id === this.groupe.id) {
            this.groupeService.setFieldInSingleData("user_demande", null);
            this.groupeService.setFieldInSingleData(
              "nombre_demandes",
              this.groupe.nombre_demandes
            );
          }

          this.loading = false;
          this.helper.alertSuccess();
        });
    });
  }

  getUrlRedirection(discussion: number): string {
    let urlRedirection: string;
    urlRedirection = `/toloba/discussion/${discussion}`;

    return urlRedirection;
  }
}
