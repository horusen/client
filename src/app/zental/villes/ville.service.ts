import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class VilleService extends BaseService {
  constructor() {
    super("villes");
  }

  getAll(emit = false) {
    return this.factory
      .get(`${this.endPoint}/all`)
      .pipe(
        tap(emit ? this.listResponseHandler() : this.onlyErrorResponseHandler())
      );
  }

  getByPays(pays: number, emitData = false): Observable<any> {
    return this.factory
      .get(`pays/${pays}/${this.endPoint}`)
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }
}
