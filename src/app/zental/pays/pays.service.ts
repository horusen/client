import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class PaysService extends BaseService {
  constructor() {
    super("pays");
  }

  getAll(emit = false) {
    return this.factory
      .get(`${this.endPoint}/all`)
      .pipe(
        tap(emit ? this.listResponseHandler() : this.onlyErrorResponseHandler())
      );
  }
}
