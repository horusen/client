import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class IdentiteService extends BaseService {
  user$ = new ReplaySubject<any>(1);

  set user(user: any) {
    this.user$.next(user);
  }

  constructor() {
    super("");
  }
}
