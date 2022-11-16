import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class LiaisonService extends BaseService {
  constructor() {
    super("liaisons");
  }

  getNonAffecteByMinistere(ministere: number): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/${this.endPoint}/non-affecte`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getNonAffecteByConsulat(consulat: number): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/${this.endPoint}/non-affecte`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getNonAffecteByAmbassade(ambassade: number): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/${this.endPoint}/non-affecte`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getByDiplomatie(
    pays: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.factory
      .get(`diplomaties/${pays}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
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

  affecter(elements: any) {
    return this.factory.post(`liaisons/affecter`, elements).pipe(
      tap((response) => {
        this.setFieldInSingleData("bureau", response);
      })
    );
  }
}
