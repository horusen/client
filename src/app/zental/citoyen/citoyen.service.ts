import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Params } from "@angular/router";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class CitoyenService extends BaseService {
  constructor() {
    super("citoyens");
  }

  getByAmbassade(
    ambassade: number,
    params: Params,
    emitData = false
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

  getByConsulat(
    consulat: number,
    params: Params,
    emitData = false
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

  getByLiaison(
    liaison: number,
    params: Params,
    emitData = false
  ): Observable<any> {
    return this.factory
      .get(`liaisons/${liaison}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }

  getByPays(pays: number, params: Params, emitData = false): Observable<any> {
    return this.factory
      .get(`pays/${pays}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }
}
