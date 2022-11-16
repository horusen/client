import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MinistreGouvernementService extends BaseService {
  constructor() {
    super("gouvernement/ministres");
  }

  getByPays(pays: number, params: Params): Observable<any> {
    return this.factory
      .get(`pays/${pays}/${this.endPoint}`)
      .pipe(tap(this.listResponseHandler()));
  }
}
