import { Observable, Subject } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ReactionService extends BaseService {
  public rebondissement$ = new Subject<any>();
  set rebondissement(rebondissement: any) {
    this.rebondissement$.next(rebondissement);
  }

  constructor() {
    super("reactions");
  }

  getByDiscussion(discussion: number): Observable<any> {
    return this.factory
      .get(`discussions/${discussion}/reactions`)
      .pipe(tap(this.listResponseHandler()));
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.pushItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
