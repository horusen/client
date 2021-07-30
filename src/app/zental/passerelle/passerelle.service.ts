import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class PasserelleService extends BaseService {
  constructor() {
    super("passerelles");
  }

  getByPays(pays: number, params: Params, emitData = true): Observable<any> {
    return this.factory
      .get(`pays/${pays}/${this.endPoint}`, { params })
      .pipe(
        tap(
          emitData
            ? this.listResponseHandler()
            : this.onlyErrorResponseHandler()
        )
      );
  }
}
