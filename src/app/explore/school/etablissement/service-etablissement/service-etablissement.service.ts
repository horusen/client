import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ServiceEtablissementService extends BaseService {
  constructor() {
    super("etablissement/service");
  }

  getByEtablissement(etablissement: number, emit: boolean = true) {
    return this.factory
      .get(`etablissement/${etablissement}/service`)
      .pipe(
        tap(emit ? this.listResponseHandler() : this.onlyErrorResponseHandler())
      );
  }

  getStatsByEtablissement(etablissement: number, params: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/service/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
