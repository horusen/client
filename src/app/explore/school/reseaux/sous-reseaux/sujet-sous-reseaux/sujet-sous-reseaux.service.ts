import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class SujetSousReseauxService extends BaseService {
  constructor() {
    super("reseaux/sujet");
  }

  getBySousDomaine(sousDomaine: number) {
    return this.factory
      .get(`sous-domaine/${sousDomaine}/sujet`)
      .pipe(tap(this.listResponseHandler()));
  }
}
