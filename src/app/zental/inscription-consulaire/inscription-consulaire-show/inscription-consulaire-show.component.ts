import { BaseSingleComponent } from "./../../../shared/components/base-component/base-single.component";
import { Component, OnInit } from "@angular/core";
import { InscritptionConsulaireService } from "../inscritption-consulaire.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-inscription-consulaire-show",
  templateUrl: "./inscription-consulaire-show.component.html",
  styleUrls: ["./inscription-consulaire-show.component.scss"],
})
export class InscriptionConsulaireShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  redigerMotif = false;
  validationsLoading = {
    valider: false,
    rejeter: false,
  };
  constructor(
    public inscriptionConsulaireService: InscritptionConsulaireService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(inscriptionConsulaireService, route);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.inscriptionConsulaireService.singleData$.subscribe({
      next: (inscription) => {
        this.loading = true;
        setTimeout(() => {
          this.single = inscription;
          this.loading = false;
        }, 100);
      },
    });

    if (!this.single) {
      this.loading = true;
      this.inscriptionConsulaireService
        .getSingle(this.route.snapshot.params.id)
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  validerInscription(): void {
    this.helper.alertConfirmation(() => {
      this.validationsLoading.valider = true;
      this.inscriptionConsulaireService
        .changerEtat({ inscription_consulaire: this.single.id, etat: 2 })
        .subscribe({
          next: () => {
            this.helper.alertSuccess();
            this.validationsLoading.valider = false;
            this.router.navigate([".."], {
              relativeTo: this.route,
              queryParamsHandling: "preserve",
            });
            this.inscriptionConsulaireService.singleData = null;
          },
        });
    });
  }

  rejeterInscription(): void {
    this.helper.alertConfirmation(() => {
      this.redigerMotif = true;
      this.helper.toggleModal("motif-inscription-consulaire-modal");
    });
  }

  onMotifTermine(): void {
    this.redigerMotif = false;
  }
}
