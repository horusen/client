import { BaseService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DiplomatieService extends BaseService {
  constructor() {
    super("diplomaties");
  }

  getByPays(pays: number, params: Params): Observable<any> {
    return this.factory
      .get(`pays/${pays}/${this.endPoint}`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getAilleursByPays(pays: number, params: Params): Observable<any> {
    return this.factory
      .get(`pays/${pays}/${this.endPoint}/ailleurs`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
