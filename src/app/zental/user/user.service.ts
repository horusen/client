import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService {
  constructor() {
    super("users");
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

  verifyConfirmationToken(user: number, token: string): Observable<any> {
    return this.factory
      .get(`${this.endPoint}/${user}/verify`, {
        params: { token },
      })
      .pipe(
        tap((response) => {
          this.singleData = response;
        })
      );
  }

  getNonMembresFamilles(user: number): Observable<any> {
    return this.factory.get(`${this.endPoint}/${user}/familles/not`);
  }

  getByNonRelation(user: number): Observable<any> {
    return this.factory.get(`${this.endPoint}/${user}/relations/not`);
  }

  getByNonContact(user: number): Observable<any> {
    return this.factory.get(`${this.endPoint}/${user}/contacts/not`);
  }
}
