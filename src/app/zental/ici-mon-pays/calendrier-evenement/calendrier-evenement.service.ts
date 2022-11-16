import { Params } from "@angular/router";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CalendrierEvenementService extends BaseService {
  constructor() {
    super("calendrier/evenements");
  }

  getByPays(pays: number, params: Params): Observable<any> {
    return this.factory
      .get(`pays/${pays}/calendrier/evenements`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
