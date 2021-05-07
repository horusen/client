import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LienParenteService extends BaseService {
  constructor() {
    super("lien-parente");
  }

  get(emit: boolean = true) {
    return this.factory.get(`${this.endPoint}`).pipe(
      tap({
        next: emit ? (data) => (this.data = data) : null,
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }
}
