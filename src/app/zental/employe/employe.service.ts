import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class EmployeService extends BaseService {
  constructor() {
    super("employes");
  }

  getByBureau(bureau: number, params: Params) {
    return this.factory
      .get(`bureaux/${bureau}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
