import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class EleveService extends BaseService {
  constructor() {
    super("classe/eleve");
  }

  getByClasse(classe: number) {
    return this.factory
      .get(`classe/${classe}/eleve`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByUserAsProfesseur() {
    return this.factory
      .get(`professeur/eleve`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/eleve`)
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
}
