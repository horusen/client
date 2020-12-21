import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class SousDomaineService extends BaseService {
  constructor() {
    super("sous-domaine");
  }

  getByDomaine(domaine: number) {
    return this.factory
      .get(`${"domaine"}/${domaine}/sous-domaine`)
      .pipe(tap(this.listResponseHandler()));
  }
}
