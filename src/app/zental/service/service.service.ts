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

  getByBureau(
    bureau: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.factory
      .get(`bureaux/${bureau}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }

  getServiceCommunicationEntiteDiplomatique(
    typeEntiteDiplomatique: string,
    idEntiteDiplomatique: number
  ) {
    return this.factory
      .get(
        `${typeEntiteDiplomatique}${
          typeEntiteDiplomatique === "bureau" ? "x" : "s"
        }/${idEntiteDiplomatique}/services/communication`
      )
      .pipe(tap(this.onlyErrorResponseHandler()));
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

  // Get service which have chargé com by ministere
  getByMinistereHasChargerCom(
    ministere: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.getByMinistere(
      ministere,
      { ...params, has_charger_com: true },
      emitData
    );
  }

  // Get service which have chargé com by ambassade
  getByAmbassadeHasChargerCom(
    ambassade: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.getByAmbassade(
      ambassade,
      { ...params, has_charger_com: true },
      emitData
    );
  }

  // Get service which have chargé com by consulat
  getByConsulatHasChargerCom(
    consulat: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.getByConsulat(
      consulat,
      { ...params, has_charger_com: true },
      emitData
    );
  }

  // Get service which have chargé com by bureau
  getByBureauHasChargerCom(
    bureau: number,
    params: Params,
    emitData = true
  ): Observable<any> {
    return this.getByBureau(
      bureau,
      { ...params, has_charger_com: true },
      emitData
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

  updateServiceCommunication(service: number, elements: any) {
    return this.factory
      .put(`${this.endPoint}/${service}/communication`, elements)
      .pipe(
        tap({
          next: (response) => {
            if (response.service_com) {
              this._data.forEach((element) => (element.service_com = 0));
              this.setFieldInRowData(
                this.findIndexItemInDataByID(response.id),
                "service_com",
                1
              );
            } else {
              this.setFieldInRowData(
                this.findIndexItemInDataByID(response.id),
                "service_com",
                0
              );
            }
          },
          error: (error) => {
            this.errorResponseHandler(error);
          },
        })
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
