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

  getByDepartement(departement: number, params: Params) {
    return this.factory
      .get(`departements/${departement}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByDomaine(domaine: number, params: Params) {
    return this.factory
      .get(`domaines/${domaine}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByPoste(poste: number, params: Params) {
    return this.factory
      .get(`postes/${poste}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByService(service: number, params: Params) {
    return this.factory
      .get(`services/${service}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByFonction(fonction: number, params: Params) {
    return this.factory
      .get(`fonctions/${fonction}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByMinistere(ministere: number, params: Params) {
    return this.factory
      .get(`ministeres/${ministere}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
