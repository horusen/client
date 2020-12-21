import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReactionTunelService extends BaseService {
  public rebondissement$ = new Subject<any>();
  constructor() {
    super("tache/tunel/reaction");
  }

  get(tunel: number) {
    return this.factory
      .get(`tache/tunel/${tunel}/reaction`)
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
