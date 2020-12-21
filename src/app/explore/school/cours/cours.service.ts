import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class CoursService extends BaseService {
  constructor() {
    super("cours");
  }

  getByClasse(classe: number) {
    return this.factory
      .get(`classe/${classe}/cours`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
