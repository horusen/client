import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class DomaineService extends BaseService {
  constructor() {
    super("domaine");
  }

  get(emit: boolean = false) {
    return this.factory.get(`${this.endPoint}`).pipe(
      tap({
        next: emit ? (data) => (this.data = data) : null,
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
