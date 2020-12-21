import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ReactionResolutionTacheService extends BaseService {
  public rebondissement$ = new Subject<any>();
  affectationTache: any; // Stock la tache pour eviter de recuperer les reactions d'une même tâche plusieurs fois

  constructor() {
    super("tache/reaction");
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

  indexer(reaction: number) {
    return this.factory.post(`${this.endPoint}/index`, { reaction }).pipe(
      tap({
        next: (index) => {
          const indexReaction = this.findIndexItemInDataByID(reaction);
          index
            ? (this.data[indexReaction].index = true)
            : (this.data[indexReaction].index = false);
        },
      })
    );
  }

  noter(reaction: number, note: number) {
    return this.factory.post(`${this.endPoint}/note`, { reaction, note }).pipe(
      tap({
        next: (note: any) => {
          const reaction_ = this.findItemInDataByID(reaction);
          reaction_.note = note.note;
        },
      })
    );
  }

  modifierNote(reaction: number, note: number) {
    return this.factory.put(`${this.endPoint}/note/${reaction}`, { note }).pipe(
      tap({
        next: (note: any) => {
          const reaction_ = this.findItemInDataByID(reaction);
          reaction_.note = note.note;
        },
      })
    );
  }
}
