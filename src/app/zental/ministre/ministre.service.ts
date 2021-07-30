import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class MinistreService extends BaseService {
  constructor() {
    super("responsables");
  }

  getActuelMinistre(ministere: number): Observable<any> {
    return this.factory.get(`ministeres/${ministere}/ministres/actuel`).pipe(
      tap({
        next: (response) => (this.singleData = response),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getAnciensMinistres(ministere: number, params: Params): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/ministres/anciens`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
