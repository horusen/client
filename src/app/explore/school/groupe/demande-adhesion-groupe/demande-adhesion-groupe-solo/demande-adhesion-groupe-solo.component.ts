import { DemandeAdhesionGroupeService } from "./../../demande-adhesion-groupe.service";
import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-demande-adhesion-groupe-solo",
  templateUrl: "./demande-adhesion-groupe-solo.component.html",
  styleUrls: ["./demande-adhesion-groupe-solo.component.scss"],
})
export class DemandeAdhesionGroupeSoloComponent
  extends BaseComponent
  implements OnInit {
  @Input() demande: any;
  constructor(public demandeService: DemandeAdhesionGroupeService) {
    super(demandeService);
  }

  ngOnInit(): void {}

  validerDemande(approbation: number) {
    if (approbation == 1 || approbation == 0) {
      this.loading = true;
      this.demandeService
        .validerDemande(this.demande.groupe, this.demande.id, approbation)
        .subscribe(() => {
          this.loading = false;
        });
    } else {
      this.helper.toastDanger(
        "Veuillez approuvez correctement la demande",
        "Erreur"
      );
    }
  }

  accepterDemande() {
    this.validerDemande(1);
  }

  refuserDemande() {
    this.validerDemande(0);
  }
}
