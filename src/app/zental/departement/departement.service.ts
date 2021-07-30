import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DepartementService extends BaseService {
  constructor() {
    super("departements");
  }

  getByMinistere(
    ministere: number,
    params?: Params,
    emitData: boolean = true
  ): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }

  getByAmbassade(
    ambassade: number,
    params?: Params,
    emitData: boolean = true
  ): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }
}
