import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { BaseService } from "../shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class IciMonPaysService extends BaseService {
  pays$ = new ReplaySubject<any>(1);
  constructor() {
    super("ici-mon-pays");
  }

  showElement(pays: number, element: string): Observable<any> {
    return this.factory.get(`pays/${pays}/${this.endPoint}/${element}`).pipe(
      tap((response) => {
        this.singleData = response;
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

  update(id: number, elements: any) {
    return this.factory.put(`${this.endPoint}`, elements).pipe(
      tap((response) => {
        this.singleData = response;
      })
    );
  }
}
