import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AmbassadeService extends BaseService {
  constructor() {
    super("ambassades");
  }

  //

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

  getByUser(user: number, params?: Params): Observable<any> {
    return this.factory
      .get(`users/${user}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByPays(
    pays: number,
    params?: Params,
    emitData: boolean = true
  ): Observable<any> {
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
