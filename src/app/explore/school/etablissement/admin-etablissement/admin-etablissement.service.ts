import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class AdminEtablissementService extends BaseService {
  constructor() {
    super("etablissement/administrateur");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/administrateur`)
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
