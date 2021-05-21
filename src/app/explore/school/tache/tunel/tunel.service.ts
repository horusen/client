import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class TunelService extends BaseService {
  user$ = new ReplaySubject<any>(1);
  constructor() {
    super("tunel");
  }

  set user(user: any) {
    this.user$.next(user);
  }

  // retourne tous les tunels que partage le user connécté avec le user en parametre
  getByUser(user: number) {
    return this.factory.get(`user/${user}/tunel`);
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(response);
          this.singleData = response;
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  getByAffectationTache(affectationTache: number) {
    return this.factory
      .get(`tache/${affectationTache}/tunel`)
      .pipe(tap(this.listResponseHandler()));
  }
}
