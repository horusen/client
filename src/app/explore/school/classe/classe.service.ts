import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ClasseService extends BaseService {
  constructor() {
    super("classe");
  }

  getByEtablissement(etablissement: number, emit = true) {
    return this.factory
      .get(`etablissement/${etablissement}/classe`)
      .pipe(
        tap(emit ? this.listResponseHandler() : this.onlyErrorResponseHandler())
      );
  }

  getByCurrentUserAsProfesseur() {
    return this.factory
      .get(`professeur/classe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getStatsbyEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/classe/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByProfesseur(professeur: number, params?: Params) {
    return this.factory
      .get(`professeur/${professeur}/classe`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
