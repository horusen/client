import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MesTachesService extends BaseService {
  constructor() {
    super("mes-taches");
  }

  getByFiltre(filtre: {}) {
    return this.factory
      .post(`${this.endPoint}`, filtre)
      .pipe(tap(this.listResponseHandler()));
  }


  // ADD ON
  private _filtre: {} = {
    sous_domaines: [],
    niveaux_difficultes: [],
    motCles: [],
    periodes: [],
    niveaux: [],
    matieres: [],
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
      : (this._filtre[property] = []);

    this.getTache(this._filtre).subscribe();
  }

  applyFilter(element: string, element_id?: any) {
    if (element_id == "null" || this.getFiltre(element) == element_id) {
      if (this.getFiltre(element).length) {
        this.setFiltre(element, []);
      }
      return;
    }

    this.setFiltre(element, [element_id]);
  }


  getTache(elements: {}) {
    this.loading$.next(true);
    return this.factory
      .post(
        `${this.endPoint}/get`,
        this.helper.omitEmptyArraysInObject(elements)
      )
      .pipe(
        tap({
          next: (data) => (this.data = data),
          error: (error) => this.errorResponseHandler(error),
          complete: () => this.loading$.next(false),
        })
      );
  }
}
