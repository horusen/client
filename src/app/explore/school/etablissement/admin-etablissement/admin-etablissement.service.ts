import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class AdminEtablissementService extends BaseService {
  constructor() {
    super("etablissement/administrateur");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/administrateur`)
      .pipe(tap(this.listResponseHandler()));
  }
}
