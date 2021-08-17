import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ContactUserService extends BaseService {
  constructor() {
    super("contacts/users");
  }

  getByUser(user: number, params?: Params): Observable<any> {
    return this.factory
      .get(`users/${user}/contacts`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
