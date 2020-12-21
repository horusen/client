import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AffectationTacheService extends BaseService {
  public _filtre: {} = {
    sous_domaines: [],
    niveaux_difficultes: [],
    motCles: [],
    langues: [],
    niveaux: [],
    matieres: [],
  };

  public hasFilter = false;

  getFiltre(property: string) {
    if (!this._filtre.hasOwnProperty(property)) {
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

    this.router.navigate([""], {
      queryParams: this.helper.omitEmptyArraysInObject(this._filtre),
    });
  }

  resetFiltre() {
    Object.keys(this._filtre).forEach((key) => {
      this._filtre[key] = [];
    });

    this.hasFilter = false;
  }

  checkIfHasFiltre() {
    const keys = Object.keys(this._filtre);
    for (let key of keys) {
      if (this._filtre[key].length) {
        this.hasFilter = true;
        return;
      }
    }
    this.hasFilter = false;
  }

  constructor(public router: Router) {
    super("tache/affectation");
  }

  // recupere tous les taches crées ou assignées par le user
  getByUserTache(tache: number) {
    return this.factory
      .get(`tache/${tache}/affectation`)
      .pipe(tap(this.listResponseHandler()));
  }

  // recupere tous les taches assignées au user
  get() {
    return this.factory
      .post(
        `${this.endPoint}/get`,
        this.helper.omitEmptyArraysInObject(this._filtre)
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getTacheAssigneParUser(filtre: {}) {
    return this.factory
      .post(
        `${this.endPoint}/suivie`,
        this.helper.omitEmptyArraysInObject(filtre)
      )
      .pipe(tap(this.listResponseHandler()));
  }

  add(elements: {
    tache: number;
    chapitre: number;
    classe: number;
    groupe: number;
    debut: Date;
    fin: Date;
  }) {
    return this.factory.post(`tache/affectation`, elements).pipe(
      tap({
        next: (tache) => {
          this.unshiftItemInData(tache);
          this.lastItemCreated = tache;
        },
      })
    );
  }

  supprimerAffectationGroupe(groupe: number, tache: number) {
    return this.factory.delete(`groupe/${groupe}/tache/${tache}/affectation`);
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

  getByUser(user: number) {
    return this.factory
      .get(`user/${user}/affectation-tache`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
