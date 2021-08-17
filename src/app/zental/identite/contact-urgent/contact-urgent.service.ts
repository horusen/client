import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ContactUrgentService extends BaseService {
  constructor() {
    super("contacts-urgents");
  }

  getContactUrgentByUser(user: number): Observable<any> {
    return this.factory
      .get(`users/${user}/contacts/urgents`)
      .pipe(tap(this.listResponseHandler()));
  }
}
