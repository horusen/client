import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ChapitreService extends BaseService {
  constructor() {
    super("chapitre");
  }

  getByCours(cours: number) {
    return this.factory
      .get(`cours/${cours}/chapitre`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
