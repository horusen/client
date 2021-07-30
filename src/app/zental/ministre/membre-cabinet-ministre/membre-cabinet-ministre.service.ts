import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class MembreCabinetMinistreService extends BaseService {
  constructor() {
    super("membre-cabinet-ministre");
  }

  getByMinistre(ministre: number, params: Params) {
    return this.factory
      .get(`ministres/${ministre}/membre-cabinet-ministre`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
