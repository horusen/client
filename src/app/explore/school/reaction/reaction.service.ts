import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReactionService extends BaseService {
  public rebondissement$ = new Subject<any>();
  affectationTache: any; // Stock la tache pour eviter de recuperer les reactions d'une même tâche plusieurs fois

  constructor() {
    super("reaction");
  }

  getReaction(affectation_tache: number) {
    this.loading = true;
    return this.factory.get(`tache/${affectation_tache}/reaction`).pipe(
      tap({
        ...this.listResponseHandler(),
        complete: () => (this.loading = false),
      })
    );
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.pushItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  getByDiscussion(discussion: number) {
    return this.factory
      .get(`discussion/${discussion}/reaction`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByTunel(tunel: number) {
    return this.factory
      .get(`tunel/${tunel}/reaction`)
      .pipe(tap(this.listResponseHandler()));
  }
}
