import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";
import { AuthService } from "src/app/authentification/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdresseService extends BaseService {
  constructor(public auth: AuthService) {
    super("adresses");
  }

  getByMinistere(ministere: number): Observable<any> {
    return this.factory
      .get(`ministeres/${ministere}/adresses`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByAmbassade(ambassade: number): Observable<any> {
    return this.factory
      .get(`ambassades/${ambassade}/adresses`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByConsulat(consulat: number): Observable<any> {
    return this.factory
      .get(`consulats/${consulat}/adresses`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByUser(user: number): Observable<any> {
    return this.factory
      .get(`users/${user}/adresses`)
      .pipe(tap(this.listResponseHandler()));
  }

  // update(id: number, data: any) {
  //   return this.factory.put(`${this.endPoint}/${id}`, data).pipe(
  //     tap({
  //       next: (response) => {
  //         this.updateItemInData(id, response);
  //         this.lastItemEdited$.next(response);
  //         if (data.user) {
  //           this.auth.setUserField("addresse", response);
  //         }

  //         if (this._singleData) {
  //           this.singleData = response;
  //         }
  //       },
  //       error: (error) => this.errorResponseHandler(error),
  //     })
  //   );
  // }
}
