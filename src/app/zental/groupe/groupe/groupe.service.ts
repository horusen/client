import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class GroupeService extends BaseService {
  constructor() {
    super("groupes");
  }

  getByUser(user: number, params: Params, emitData = true) {
    return this.factory
      .get(`users/${user}/groupes`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }

  getByUserAsNonMembre(user: number, params: Params, emitData = true) {
    return this.factory
      .get(`users/${user}/groupes/not`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }
}
