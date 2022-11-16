import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PieceConsulaireService extends BaseService {
  constructor() {
    super("pieces-consulaires");
  }

  getByUserAndType(user: number, type: number): Observable<any> {
    return this.factory
      .get(`users/${user}/pieces-consulaires/${type}`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
