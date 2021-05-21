import { DemandeAdhesionGroupeService } from "./../../../groupe/demande-adhesion-groupe.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";
import { TunelService } from "../tunel.service";
import { Helper } from "src/app/shared/services/helper";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-participant-tunel",
  templateUrl: "./participant-tunel.component.html",
  styleUrls: ["./participant-tunel.component.scss"],
})
export class ParticipantTunelComponent extends BaseComponent implements OnInit {
  addParticipant: boolean = false;
  rejoindreGroupeLoading = false;
  changerPrivilegeMembre: boolean = false;
  voirDemandesParticipations: boolean = false;
  tunel: any;
  constructor(
    public tunelService: TunelService,
    public auth: AuthService,
    public demandeAdhesionGroupeService: DemandeAdhesionGroupeService,
    public helper: Helper
  ) {
    super(tunelService);
  }

  ngOnInit(): void {
    this._subscription["tunel"] = this.tunelService.singleData$.subscribe(
      (tunel) => {
        this.tunel = tunel;
      }
    );
  }

  faireUneDemandeDAdhesion() {
    this.helper.alertConfirmation(() => {
      this.rejoindreGroupeLoading = true;
      this.demandeAdhesionGroupeService
        .faireUneDemande(this.tunel.id_groupe)
        .subscribe(() => {
          this.rejoindreGroupeLoading = false;
          this.tunel.is_user_has_demande_participation = true;
        });
    });
  }

  annulerDemandeDAdhesion() {
    this.helper.alertConfirmation(() => {
      this.rejoindreGroupeLoading = true;
      this.demandeAdhesionGroupeService
        .annulerDemande(this.tunel.id_groupe)
        .subscribe(() => {
          this.rejoindreGroupeLoading = false;
          this.tunel.is_user_has_demande_participation = false;
        });
    });
  }
}
