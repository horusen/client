import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ProgrammeService extends BaseService {
  constructor() {
    super("programme");
  }

  getByCurrentUserAsProfesseur(params?: any) {
    return this.factory
      .get(`professeur/programme`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getStatsByEtablissement(etablissement: number, params?: any) {
    return this.factory
      .get(`etablissement/${etablissement}/programme/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByEtablissement(etablissement: number, emitData = true, params?: any) {
    return this.factory
      .get(`etablissement/${etablissement}/programme`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }
}
