import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Params } from "@angular/router";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ResponsableService extends BaseService {
  constructor() {
    super("responsables");
  }

  getByAcutelMinistre(ministere: number): Observable<any> {
    return this.factory.get(`ministeres/${ministere}/ministres/actuel`).pipe(
      tap((responsable) => {
        this.singleData = responsable;
      })
    );
  }

  getByActuelAmbassadeur(ambassade: number): Observable<any> {
    return this.factory.get(`ambassades/${ambassade}/ambassadeurs/actuel`).pipe(
      tap((responsable) => {
        this.singleData = responsable;
      })
    );
  }

  getByActuelConsule(consulat: number): Observable<any> {
    return this.factory.get(`consulats/${consulat}/consules/actuel`).pipe(
      tap((responsable) => {
        this.singleData = responsable;
      })
    );
  }

  getByAnciensMinistres(ministere: number, params: Params): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/ministres/anciens`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByAnciensAmbassadeurs(ambassade: number, params: Params): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/ambassadeurs/anciens`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByAnciensConsules(consulat: number, params: Params): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/consules/anciens`, { params })
      .pipe(tap(this.listResponseHandler()));
  }
}
