import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class AffecterTacheService extends BaseService {
  constructor() {
    super("tache/affectation");
  }

  getByUserTache(tache: number) {
    return this.factory
      .get(`tache/${tache}/affectation`)
      .pipe(tap(this.listResponseHandler()));
  }

  supprimerAffectationGroupe(groupe: number, tache: number) {
    return this.factory.delete(`groupe/${groupe}/tache/${tache}/affectation`);
  }
}
