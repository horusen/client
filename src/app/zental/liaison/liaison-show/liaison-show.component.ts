import { MinistereService } from "./../../ministere/ministere.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { LiaisonService } from "../liaison.service";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { HttpErrorResponse } from "@angular/common/http";
import { InscritptionConsulaireService } from "../../inscription-consulaire/inscritption-consulaire.service";

@Component({
  selector: "app-liaison-show",
  templateUrl: "./liaison-show.component.html",
  styleUrls: ["./liaison-show.component.scss"],
})
export class LiaisonShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  affecter = false;
  edit = false;
  inscriptionConsulaire = false;
  inscriptionConsulaireLoading = false;
  redigerMotif = false;
  constructor(
    public liaisonService: LiaisonService,
    public route: ActivatedRoute,
    public router: Router,
    public inscriptionConsulaireService: InscritptionConsulaireService
  ) {
    super(liaisonService);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = true;
    super.ngOnInit();
  }

  affecterLiaison(): void {
    this.affecter = true;
    this.helper.toggleModal("affecter-liaison-modal");
  }

  checkEligibiliteInscriptionConsulaire(): void {
    this.inscriptionConsulaireLoading = true;
    this.inscriptionConsulaireService
      .checkEligibilite(this.auth.user.id_inscription)
      .subscribe({
        next: () => {
          this.inscriptionConsulaire = true;
          this.helper.toggleModal("inscription-consulaire-modal");
          this.inscriptionConsulaireLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.helper.alertDanger(error.error.error);
            this.inscriptionConsulaireLoading = false;
          }
        },
      });
  }

  annulerInscriptionConsulaire(): void {
    this.helper.alertConfirmation(() => {
      this.inscriptionConsulaireLoading = true;
      this.inscriptionConsulaireService
        .changerEtat({ user: this.auth.user.id_inscription, etat: 4 })
        .subscribe({
          next: () => {
            this.liaisonService.singleData.user_inscription_consulaire = null;

            this.inscriptionConsulaireLoading = false;
            this.helper.alertSuccess();
          },
        });
    });
  }

  quitter(): void {
    this.helper.alertConfirmation(() => {
      this.redigerMotif = true;
      this.helper.toggleModal("motif-inscription-consulaire-modal");
    });
  }

  onMotifTermine(): void {
    this.redigerMotif = false;
  }

  supprimer() {
    this.helper.alertConfirmation(() => {
      this.loading = true;
      this.liaisonService.delete(this.single.id).subscribe(() => {
        this.loading = false;
        this.helper.alertSuccess();
        this.router.navigate([".."], {
          relativeTo: this.route,
          queryParamsHandling: "preserve",
        });
      });
    });
  }

  modifier(): void {
    this.edit = true;
    this.helper.toggleModal("liaison-edit-modal");
  }
}
