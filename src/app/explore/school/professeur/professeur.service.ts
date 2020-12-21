import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ProfesseurService extends BaseService {
  constructor() {
    super("professeur");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/professeur`)
      .pipe(tap(this.listResponseHandler()));
  }
}
