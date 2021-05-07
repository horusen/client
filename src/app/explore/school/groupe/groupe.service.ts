import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { query } from "@angular/animations";
import { Params } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GroupeService extends BaseService {
  constructor() {
    super("groupe");
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  get(params?: any) {
    return this.factory
      .get(`${this.endPoint}/classe/user`, { params: params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getSingle(id: number) {
    this.loading$.next(true);
    return this.factory.get(`${this.endPoint}/${id}`).pipe(
      tap({
        next: (single) => {
          this.singleData = single;
          this.loading$.next(false);
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  rejoindreGroupe(elements: any) {
    return this.factory.post(`groupe/membre/rejoindre`, elements).pipe(
      tap({
        next: () => {
          this._singleData.user_privilege = 3;
          this.singleData$.next(this._singleData);
        },
      })
    );
  }

  getByEtablissement(etablissement: number, params?: any) {
    return this.factory
      .get(`etablissement/${etablissement}/groupe`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getAnciensGroupes(classe: number) {
    return this.factory
      .get(`classe/${classe}/groupe/ancien`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByTache(tache: number) {
    return this.factory
      .get(`tache/${tache}/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }

  // Ne garde pas les données dans le service
  getByClasse(classe: number, params?: any, emit: boolean = true) {
    return this.factory
      .get(`classe/${classe}/groupe`, { params: params })
      .pipe(
        tap(emit ? this.listResponseHandler() : this.onlyErrorResponseHandler())
      );
  }

  // Garde les données dans le service
  getGroupeByClasse(classe: number) {
    return this.factory
      .get(`classe/${classe}/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getGroupeIndependantByUserAsMembre() {
    return this.factory
      .get(`groupe/independant/user`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByCurrentUserAsProfesseur() {
    return this.factory
      .get(`professeur/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }

  delete(id: number) {
    return this.factory.delete(`${this.endPoint}/${id}`).pipe(
      tap({
        next: () => {
          this.deleteItemInData(id);
          this.singleData = null;
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getGroupeIndependant(params?: any) {
    return this.factory
      .get(`${this.endPoint}/independant`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByDomaine(domaine: number) {
    return this.factory
      .get(`domaine/${domaine}/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getGroupeProfesseurByUserAsProfesseur(params?: any) {
    return this.factory
      .get(`professeur/groupe/user`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByEleve(eleve: number, params: Params): Observable<any> {
    return this.factory
      .get(`eleve/${eleve}/groupe`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByProfesseur(professeur: number, params?: Params): Observable<any> {
    return this.factory
      .get(`professeur/${professeur}/groupe`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getGroupesPartages(user: number, params?: Params): Observable<any> {
    return this.factory
      .get(`user/${user}/groupe/partage`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getStatsByEtablissement(
    etablissement: number,
    params?: Params
  ): Observable<any> {
    return this.factory
      .get(`etablissement/${etablissement}/groupe/stats`, { params: params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
