import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class EmployeService extends BaseService {
  constructor() {
    super("employe");
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          const employesID = this.data.map((item) => item.employe);
          if (employesID.includes(response.employe))
            this.deleteItemInData(response.employe, "employe");

          this.unshiftItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  getByEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/employe`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByTypeEtablissement(typeEtablissement: number) {
    return this.factory
      .get(`etablissement/type/${typeEtablissement}/employe`)
      .pipe(tap(this.listResponseHandler()));
  }

  
  getByService(service: number, params?: Params) {
    return this.factory
      .get(`etablissement/service/${service}/employe`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getStatsByEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/employe/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
