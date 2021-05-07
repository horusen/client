import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ParentEleveService extends BaseService {
  constructor() {
    super("parent-eleve");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/parent-eleve`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByEleve(eleve: number, params: Params): Observable<any> {
    return this.factory
      .get(`eleve/${eleve}/parent`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getStatsByEtablissement(
    etablissement: number,
    params?: Params
  ): Observable<any> {
    return this.factory
      .get(`etablissement/${etablissement}/parent-eleve/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
