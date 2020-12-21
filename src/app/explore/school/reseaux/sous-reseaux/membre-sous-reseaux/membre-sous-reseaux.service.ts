import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MembreSousReseauxService extends BaseService {
  constructor() {
    super("membre");
  }

  getBySousReseau(sousReseau: number) {
    return this.factory
      .get(`sous-domaine/${sousReseau}/membre`)
      .pipe(tap(this.listResponseHandler()));
  }

  research(sous_domaine: number, word: string, fields: string[]) {
    return this.factory
      .post(`sous_domaine/user/search`, { word, fields, sous_domaine })
      .pipe(tap(this.listResponseHandler()));
  }
}
