import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MembreCabinetService extends BaseService {
  constructor() {
    super("employes");
  }

  getByMinistere(ministere: number, params: Params): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/membre-cabinets`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByAmbassade(ambassade: number, params: Params): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/membre-cabinets`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByConsulat(consulat: number, params: Params): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/membre-cabinets`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
