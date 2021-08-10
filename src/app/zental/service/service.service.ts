import { tap } from "rxjs/operators";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServiceService extends BaseService {
  constructor() {
    super("services");
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

  getByDepartement(
    departement: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.factory
      .get(`departements/${departement}/${this.endPoint}`, { params })
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
    params: Params,
    emitData = true
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
    emitData = true
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

  getByDomaine(
    domaine: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.factory
      .get(`domaines/${domaine}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }

  // getByService(
  //   service: number,
  //   params: Params,
  //   emitData = true
  // ): Observable<any> {
  //   return this.factory
  //     .get(`services/${service}/${this.endPoint}`, { params })
  //     .pipe(
  //       tap(
  //         emitData
  //           ? this.listResponseHandler()
  //           : this.onlyErrorResponseHandler()
  //       )
  //     );
  // }
}
