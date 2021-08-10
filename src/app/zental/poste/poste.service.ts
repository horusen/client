import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class PosteService extends BaseService {
  constructor() {
    super("postes");
  }

  getByMinistere(
    ministere: number,
    params: Params,
    emitData = true
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

  getByAmbassade(ambassade: number, params: Params): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByConsulat(consulat: number, params: Params): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
