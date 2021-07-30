import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class AdresseService extends BaseService {
  constructor() {
    super("adresses");
  }

  getByMinistere(ministere: number): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/adresses`)
      .pipe(tap(this.listResponseHandler()));
  }
}
