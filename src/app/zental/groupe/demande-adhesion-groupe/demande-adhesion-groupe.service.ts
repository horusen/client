import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DemandeAdhesionGroupeService extends BaseService {
  constructor() {
    super("groupes/demandes");
  }

  valider(id: number, data: {}) {
    return this.factory.put(`${this.endPoint}/${id}/valider`, data).pipe(
      tap({
        next: (response) => {
          this.deleteItemInData(response.demande?.id);
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getByGroupe(groupe: number, params: Params): Observable<any> {
    return this.factory
      .get(`groupes/${groupe}/demandes`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  annuler(demande: number) {
    return this.factory.delete(`${this.endPoint}/${demande}/annuler`).pipe(
      tap({
        next: (response) => {
          this.deleteItemInData(response.id);
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
