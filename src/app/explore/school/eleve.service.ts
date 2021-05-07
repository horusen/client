import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class EleveService extends BaseService {
  constructor() {
    super("eleve");
  }

  add(element: any) {
    return this.factory.post(`${this.endPoint}`, element).pipe(
      tap({
        next: (eleves) => {
          this._data.unshift(...eleves);
          this.data$.next(this.data);
        },
      })
    );
  }

  getEleveDuMemeClasse(eleve: number, params?: Params) {
    return this.factory
      .get(`eleve/${eleve}/meme-classe`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getStatsByEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/eleve/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByProfesseur(professeur: number, params?: Params) {
    return this.factory
      .get(`professeur/${professeur}/eleve`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByUserAsProfesseur(user: number, params?: Params) {
    return this.factory
      .get(`user-as-professeur/${user}/eleve`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByClasse(classe: number, params?: Params) {
    return this.factory
      .get(`classe/${classe}/eleve`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByCurrentUserAsProfesseur() {
    return this.factory
      .get(`professeur/eleve`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/eleve`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getHorsEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/eleve/not`)
      .pipe(tap(this.listResponseHandler()));
  }

  getElevesInternationals(keyword?: string) {
    return this.factory
      .get(
        keyword ? `eleve/international?query=${keyword}` : `eleve/international`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getByParent(parent: number, params?: Params) {
    return this.factory
      .get(`parent-eleve/${parent}/eleve`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
