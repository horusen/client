import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PresidentService extends BaseService {
  constructor() {
    super("presidents");
  }

  getByPays(pays: number): Observable<any> {
    return this.factory.get(`pays/${pays}/president`).pipe(
      tap({
        next: (president) => {
          this.singleData = president;
        },
      })
    );
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.singleData = response;
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
