import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MembreGroupeService extends BaseService {
  constructor() {
    super("groupes/membres");
  }

  getByGroupe(groupe: number, params: Params) {
    return this.factory
      .get(`groupes/${groupe}/membres`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this._data = [...response, ...this._data];
          this.data$.next(this._data);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
