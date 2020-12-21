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

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/classe`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByUserAsProfesseur() {
    return this.factory
      .get(`professeur/classe`)
      .pipe(tap(this.listResponseHandler()));
  }
}
