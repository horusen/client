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

  getByEtablissements(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/formation`)
      .pipe(tap(this.listResponseHandler()));
  }
}
