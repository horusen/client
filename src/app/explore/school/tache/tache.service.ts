import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TacheService extends BaseService {
  // Permet de pouvoir filtrer la liste des taches
  private _filtre: {} = {
    sous_domaines: null,
    niveaux_difficultes: null,
    motCles: null,
    periodes: null,
    niveaux: null,
    matieres: null,
  };

  getFiltre(property: string) {
    if (!this._filtre.hasOwnProperty(property)) {
      this.helper.alertDanger("error");
      return;
    }

    return this._filtre[property];
  }

  setFiltre(property: string, value: any[]) {
    if (!this._filtre.hasOwnProperty(property)) {
      this.helper.alertDanger("error");
      return;
    }
    value.length
      ? (this._filtre[property] = value)
      : (this._filtre[property] = null);

    this.getTache(this._filtre).subscribe();
  }

  constructor() {
    super("tache");
  }

  getTache(elements: {}) {
    this.loading$.next(true);
    return this.factory
      .post(`${this.endPoint}/get`, this.helper.omitNullValueInObject(elements))
      .pipe(
        tap({
          next: (data) => (this.data = data),
          error: (error) => this.errorResponseHandler(error),
          complete: () => this.loading$.next(false),
        })
      );
  }

  getByChapitre(chapitre: number) {
    return this.factory
      .get(`chapitre/${chapitre}/tache`)
      .pipe(tap(this.listResponseHandler()));
  }
}
