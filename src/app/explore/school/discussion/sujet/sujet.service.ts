import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class SujetService extends BaseService {
  constructor() {
    super("sujet");
  }

  getBySousReseau(sousReseau: number, params?: any) {
    return this.factory
      .get(`sous-reseau/${sousReseau}/sujet`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByGroupe(groupe: number, params?: any) {
    return this.factory
      .get(`groupe/${groupe}/sujet`, { params: params })
      .pipe(tap(this.listResponseHandler()));
  }

  changerEtat(sujet: number, etat: number) {
    return this.factory.patch(`sujet/${sujet}/etat`, { etat }).pipe(
      tap({
        next: (sujet) => {
          const indexSujet = this.findIndexItemInDataByID(sujet.id);
          this.setFieldInRowData(indexSujet, "etat", etat);
        },
      })
    );
  }
}
