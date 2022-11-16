import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DiscussionService extends BaseService {
  constructor() {
    super("discussions");
  }

  check(type_discussion: number, membre1: number, membre2: number) {
    let data = { type_discussion };

    switch (type_discussion) {
      case 1:
        data["user"] = membre1;
        data["user2"] = membre2;
        break;
      case 2:
        data["user"] = membre1;
        data["service"] = membre2;
        break;
      case 3:
        data["user"] = membre1;
        data["groupe"] = membre2;
        break;
      case 4:
        data["service"] = membre1;
        data["service2"] = membre2;
        break;

      default:
        break;
    }

    return this.factory
      .post(`discussions`, data)
      .pipe(tap({ next: (discussion) => (this.singleData = discussion) }));
  }

  getDernieresDiscussionsUtilisateur(user: number): Observable<any> {
    return this.getDernieresDiscussions({ id: user, type: "users" });
  }

  getDernieresDiscussionsService(service: number): Observable<any> {
    return this.getDernieresDiscussions({ id: service, type: "services" });
  }

  private getDernieresDiscussions(dialoguant: {
    id: number;
    type: string;
  }): Observable<any> {
    return this.factory
      .get(`${dialoguant.type}/${dialoguant.id}/discussions/latest`)
      .pipe(tap(this.listResponseHandler()));
  }

  sortData(discussion: number) {
    const index = this.findIndexItemInDataByID(discussion);
    if (index !== 0) {
      const discussionItem = this.findItemInDataByID(discussion);
      this._data.splice(index, 1);
      this._data.unshift(discussionItem);
    }
  }
}
