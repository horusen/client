import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DernieresDiscussionsService extends BaseService {
  constructor() {
    super("");
  }

  getDernierDiscussion(type: string, idType: number) {
    return this.factory
      .get(`${type}/${idType}/discussion/latest`)
      .pipe(tap(this.listResponseHandler()));
  }
}
