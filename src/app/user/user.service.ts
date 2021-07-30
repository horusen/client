import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService {
  constructor() {
    super("user");
  }

  getAll() {
    return this.factory
      .get("users/all")
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getNonEmployeDansService(service: number): Observable<any> {
    return this.factory
      .get(`services/${service}/users/employes/not`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
