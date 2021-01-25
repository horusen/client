import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  private _previousUrl: string;

  set previousUrl(url: string) {
    this._previousUrl = url;
  }

  get previousUrl() {
    return this._previousUrl;
  }
  constructor() {}
}
