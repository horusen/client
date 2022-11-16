import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ComposantDescriptionService extends BaseService {
  constructor() {
    super("");
  }

  patch(path: string, data: {}) {
    return this.factory.patch(`${path}`, data);
  }
}
