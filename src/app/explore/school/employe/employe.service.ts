import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

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
          if (!employesID.includes(response.employe))
            this.unshiftItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/employe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByTypeEtablissement(typeEtablissement: number) {
    return this.factory
      .get(`etablissement/type/${typeEtablissement}/employe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByService(service: number) {
    return this.factory
      .get(`etablissement/service/${service}/employe`)
      .pipe(tap(this.listResponseHandler()));
  }
}
