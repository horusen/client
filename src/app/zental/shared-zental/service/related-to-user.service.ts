import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class RelatedToUserService extends BaseService {
  constructor() {
    super("");
  }

  getNonMembreGroupe(groupe: number): Observable<any> {
    return this.factory
      .get(`groupes/${groupe}/non-membres`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
