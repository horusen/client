import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class BureauService extends BaseService {
  constructor() {
    super("bureaux");
  }

  getByMinistere(
    ministere: number,
    params?: Params,
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
    params?: Params,
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
    return this.factory.post(`bureaux/affecter`, elements).pipe(
      tap((response) => {
        if (elements.affecter === "LIAISON") {
          this.setFieldInSingleData("passerelle", null);
          this.setFieldInSingleData("liaison", response);
        } else if (elements.affecter === "PASSERELLE") {
          this.setFieldInSingleData("liaison", null);
          this.setFieldInSingleData("passerelle", response);
        }
      })
    );
  }
}
