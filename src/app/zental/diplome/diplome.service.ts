import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DiplomeService extends BaseService {
  constructor() {
    super("diplomes");
  }

  getByUser(user: number): Observable<any> {
    return this.factory
      .get(`users/${user}/${this.endPoint}`)
      .pipe(tap(this.listResponseHandler()));
  }
}
