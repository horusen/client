import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class GroupeService extends BaseService {
  constructor() {
    super("groupe");
  }

  getByTache(tache: number) {
    return this.factory
      .get(`tache/${tache}/groupe`)
      .pipe(tap(this.listResponseHandler()));
  }
}
