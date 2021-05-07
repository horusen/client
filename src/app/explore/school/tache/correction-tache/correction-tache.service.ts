import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CorrectionTacheService extends BaseService {
  constructor() {
    super("tache/correction");
  }

  getCorrections(tache: number) {
    return this.factory.get(`tache/${tache}/corrections`).pipe(
      tap({
        next: (corrections) => (this.data = corrections),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getCorrectionParDefaut(tache: number) {
    return this.factory.get(`tache/${tache}/correction`).pipe(
      tap({
        next: (correction) => (this.singleData = correction),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getByCreator(user: number, params?: Params) {
    return this.factory
      .get(`user/${user}/corrections`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getAutresCorrections(tache: number, correction: number) {
    return this.factory.get(`tache/${tache}/correction/${correction}`).pipe(
      tap({
        next: (corrections) => (this.data = corrections),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          if (this.singleData) {
            this.lastItemCreated = response;
            this.unshiftItemInData(response);
          } else {
            this.singleData = response;
          }
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
