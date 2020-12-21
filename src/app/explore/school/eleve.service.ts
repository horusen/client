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
}
