import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class InscritptionConsulaireService extends BaseService {
  constructor() {
    super("inscriptions-consulaires");
  }

  getByAmbassade(ambassade: number, params: Params): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByLiaison(liaison: number, params: Params): Observable<any> {
    return this.factory
      .get(`liaisons/${liaison}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByConsulat(consulat: number, params: Params): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  changerEtat(elements: any): Observable<any> {
    return this.factory.post(`${this.endPoint}/etat/edit`, elements).pipe(
      tap({
        next: () => {
          this.deleteItemInData(elements.inscription_consulaire);
        },
      })
    );
  }

  checkEligibilite(user: number): Observable<any> {
    return this.factory.get(`${this.endPoint}/eligibilites/${user}`);
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(response);
        },
      })
    );
  }
}
