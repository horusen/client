import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class GroupeService extends BaseService {
  constructor() {
    super("groupe");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/groupe`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getAnciensGroupes(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/groupe/ancien`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByTache(tache: number) {
    return this.factory
      .get(`tache/${tache}/groupe`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  // Ne garde pas les données dans le service
  getByClasse(classe: number) {
    return this.factory
      .get(`classe/${classe}/groupe`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  // Garde les données dans le service
  getGroupeByClasse(classe: number) {
    return this.factory
      .get(`classe/${classe}/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByUserAsProfesseur() {
    return this.factory
      .get(`professeur/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }

  get() {
    return this.factory
      .get(`${this.endPoint}/get`)
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

  getGroupeIndependant() {
    return this.factory
      .get(`${this.endPoint}/independant`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByDomaine(domaine: number) {
    return this.factory
      .get(`domaine/${domaine}/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }
}
