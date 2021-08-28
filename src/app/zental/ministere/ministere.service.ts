import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class MinistereService extends BaseService {
  constructor() {
    super("ministeres");
  }

  getByCurrentUser(params: Params): Observable<any> {
    return this.factory
      .get(`${this.endPoint}/current-user`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  addAdresses(adresses: any): void {
    this._singleData.adresses = adresses;
    this.singleData$.next(this._singleData);
  }
}
