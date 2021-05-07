import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class FormationService extends BaseService {
  constructor() {
    super("formation");
  }

  getByEtablissement(etablissement: number, params?: any) {
    return this.factory
      .get(`etablissement/${etablissement}/formation`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getStatsByEtablissement(etablissement: number, params?: any) {
    return this.factory
      .get(`etablissement/${etablissement}/formation/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByProgramme(programme: number, params?: any) {
    return this.factory
      .get(`programme/${programme}/formation`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
