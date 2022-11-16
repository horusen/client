import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { InscritptionConsulaireService } from "../../inscription-consulaire/inscritption-consulaire.service";
import { AmbassadeService } from "../ambassade.service";

@Component({
  selector: "app-profil-ambassade",
  templateUrl: "./profil-ambassade.component.html",
  styleUrls: ["./profil-ambassade.component.scss"],
})
export class ProfilAmbassadeComponent
  extends BaseSingleComponent
  implements OnInit, AfterViewInit
{
  inscriptionConsulaire = false;
  inscriptionConsulaireLoading = false;
  redigerMotif: boolean;
  edit = false;
  constructor(
    public ambassadeService: AmbassadeService,
    public inscriptionConsulaireService: InscritptionConsulaireService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "edit-ambassade") {
        this.edit = true;
        this.helper.toggleModal("ambassade-edit-modal");
      }
    });
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
            this.ambassadeService.singleData.user_inscription_consulaire = null;
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
}
