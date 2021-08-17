import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IdentiteService {
  user$ = new ReplaySubject<any>(1);

  set user(user: any) {
    this.user$.next(user);
  }

  constructor() {}
}
