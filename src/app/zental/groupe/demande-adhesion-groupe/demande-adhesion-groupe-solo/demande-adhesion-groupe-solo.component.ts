import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { GroupeService } from "../../groupe/groupe.service";
import { DemandeAdhesionGroupeService } from "../demande-adhesion-groupe.service";

@Component({
  selector: "app-demande-adhesion-groupe-solo",
  templateUrl: "./demande-adhesion-groupe-solo.component.html",
  styleUrls: ["./demande-adhesion-groupe-solo.component.scss"],
})
export class DemandeAdhesionGroupeSoloComponent
  extends BaseComponent
  implements OnInit
{
  @Input() demande: any;
  constructor(
    public demandeAdhesionService: DemandeAdhesionGroupeService,
    public groupeService: GroupeService
  ) {
    super();
  }

  ngOnInit(): void {}

  valider(validation: string): void {
    this.helper.alertConfirmation(() => {
      if (validation === "accepter" || validation === "refuser") {
        this.loading = true;
        this.demandeAdhesionService
          .valider(this.demande.id, {
            ...this.demande,
            user: this.demande.user.id_inscription,
            validation,
          })
          .subscribe(() => {
            this.loading = false;
            if (validation === "accepter") {
              this.groupeService.setFieldInSingleData(
                "nombre_membres",
                ++this.groupeService.singleData.nombre_membres
              );
            }

            this.groupeService.setFieldInSingleData(
              "nombre_demandes",
              --this.groupeService.singleData.nombre_demandes
            );
            this.helper.alertSuccess();
          });
      } else {
        this.helper.toastDanger("Erreur de validation");
      }
    });
  }
}
