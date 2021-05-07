import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { GroupeService } from "./groupe.service";
import { MembreGroupeService } from "./groupe-show/membre-groupe/membre-groupe.service";

@Injectable({
  providedIn: "root",
})
export class DemandeAdhesionGroupeService extends BaseService {
  constructor(
    public groupeService: GroupeService,
    public membreGroupeService: MembreGroupeService
  ) {
    super("groupe/membre/demande");
  }

  getByGroupe(groupe: number) {
    return this.factory
      .get(`groupe/${groupe}/membre/demande`)
      .pipe(tap(this.listResponseHandler()));
  }

  faireUneDemande(groupe: number) {
    return this.factory.post(`${this.endPoint}`, { groupe }).pipe(
      tap({
        next: () => {
          this.groupeService.setFieldInSingleData("user_has_demande", true);
        },
      })
    );
  }

  validerDemande(groupe: number, demande: number, approbation: number) {
    return this.factory
      .post(`${this.endPoint}/validation`, { demande, groupe, approbation })
      .pipe(
        tap({
          next: (membre) => {
            if (membre) {
              if (this.membreGroupeService.data.length) {
                this.membreGroupeService.unshiftItemInData(membre);
              }

              this.deleteItemInData(demande);
            }
          },
        })
      );
  }

  annulerDemande(groupe: number) {
    return this.factory.post(`${this.endPoint}/delete`, { groupe }).pipe(
      tap({
        next: () => {
          this.groupeService.setFieldInSingleData("user_has_demande", false);
        },
      })
    );
  }
}
