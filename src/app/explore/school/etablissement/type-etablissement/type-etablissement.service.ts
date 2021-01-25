import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TypeEtablissementService extends BaseService {
  constructor() {
    super("etablissement/type");
  }

  initialiseLocally() {
    return this.factory.get(`${this.endPoint}/initialise`).pipe(
      tap({
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
