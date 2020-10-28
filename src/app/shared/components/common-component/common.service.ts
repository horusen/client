import { tap } from "rxjs/operators";

import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";

@Injectable({
  providedIn: "root",
})
export class CommonService extends BaseService {
  configuration$ = new Subject<any>();
  lastItemCreated$ = new Subject<any>();

  constructor() {
    super("");
  }

  create(endpoint: string, elements: object) {
    return this.factory.post(endpoint, elements);
  }
}
