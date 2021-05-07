import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MembreGroupeService extends BaseService {
  constructor() {
    super("groupe/membre");
  }

  getByGroupe(groupe: number) {
    return this.factory
      .get(`groupe/${groupe}/membre`)
      .pipe(tap(this.listResponseHandler()));
  }

  changerPrivilege(membership: number, privilege: number) {
    return this.factory
      .put(`groupe/membre/${membership}/privilege`, {
        type_membre: privilege,
      })
      .pipe(
        tap({
          next: (membre) => {
            const indexMembre = this.findIndexItemInDataByID(membership);
            this.data[indexMembre] = membre;
            this.singleData = membre;
          },
          error: (error) => {
            this.errorResponseHandler(error);
          },
        })
      );
  }

  getNonMembreDansClasse(groupe: number) {
    return this.factory.get(`groupe/${groupe}/non-membre/classe`);
  }

  getNonMembreProfesseur(groupe: number) {
    return this.factory.get(`groupe/${groupe}/non-membre/professeur`);
  }

  getNonMembreGroupeIndependant(groupe: number) {
    return this.factory.get(`groupe/independant/${groupe}/non-membre`);
  }

  deleteMembre(groupe: number, membre: number) {
    return this.factory.delete(`groupe/${groupe}/membre/${membre}`).pipe(
      tap({
        next: () => {
          this.data = this.data.filter(
            (membership) => membership.membre_details.id != membre
          );
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response: any[]) => {
          this.data = [...this.data, ...response];
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
