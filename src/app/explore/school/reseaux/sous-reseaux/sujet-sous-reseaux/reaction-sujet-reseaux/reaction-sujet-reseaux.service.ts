import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ReactionSujetReseauxService extends BaseService {
  public rebondissement$ = new Subject<any>();
  sujet: any; // Stock la tache pour eviter de recuperer les reactions d'une même tâche plusieurs fois

  constructor() {
    super("reseaux/sujet/reaction");
  }

  getBySujet(sujet: number) {
    this.loading = true;
    return this.factory.get(`reseaux/sujet/${sujet}/reaction`).pipe(
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
          this.unshiftItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
