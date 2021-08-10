import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class FonctionService extends BaseService {
  constructor() {
    super("fonctions");
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

  getByConsulat(
    consulat: number,
    params?: Params,
    emitData: boolean = true
  ): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/${this.endPoint}`, { params })
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
