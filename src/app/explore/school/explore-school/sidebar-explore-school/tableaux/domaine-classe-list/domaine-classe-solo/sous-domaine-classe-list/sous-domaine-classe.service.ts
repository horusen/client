import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class SousDomaineClasseService extends BaseService {
  constructor() {
    super("sous-domaine");
  }

  getDataByDomaine(domaine: number) {
    return this.factory.get(`${"domaine"}/${domaine}/sous-domaine/classe`).pipe(
      tap({
        // next: (data) => (this.data = data),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
