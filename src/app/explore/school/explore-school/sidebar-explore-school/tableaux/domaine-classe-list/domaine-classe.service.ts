import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DomaineClasseService extends BaseService {
  constructor() {
    super("domaine");
  }

  get(): Observable<any> {
    return this.factory.get(`${this.endPoint}/classe`).pipe(
      tap({
        next: (data) => (this.data = data),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
