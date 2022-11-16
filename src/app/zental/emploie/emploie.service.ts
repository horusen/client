import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class EmploieService extends BaseService {
  constructor() {
    super("emploies");
  }

  getByUser(user: number): Observable<any> {
    return this.factory
      .get(`users/${user}/${this.endPoint}`)
      .pipe(tap(this.listResponseHandler()));
  }
}
