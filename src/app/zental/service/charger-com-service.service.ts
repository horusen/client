import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";
import { EmployeService } from "../employe/employe.service";
import { ServiceService } from "./service.service";

@Injectable({
  providedIn: "root",
})
export class ChargerComServiceService extends BaseService {
  constructor(
    public employeService: EmployeService,
    public serviceService: ServiceService
  ) {
    super("services/charger-com");
  }

  getByService(service: number): Observable<any> {
    return this.factory
      .get(`services/${service}/charger-com`)
      .pipe(tap(this.listResponseHandler()));
  }

  update(id: number, data: {}) {
    return this.factory.put(`${this.endPoint}/${id}`, data).pipe(
      tap({
        next: (response) => {
          this.employeService.updateItemInData(id, response);

          if (this.employeService.singleData) {
            this.employeService.singleData = response;
          }

          if (this.serviceService.singleData) {
            this.serviceService.singleData = {
              ...this.serviceService.singleData,
              has_charger_com: true,
            };
          }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
