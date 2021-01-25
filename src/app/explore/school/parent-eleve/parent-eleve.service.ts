import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ParentEleveService extends BaseService {
  constructor() {
    super("parent-eleve");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/parent-eleve`)
      .pipe(tap(this.listResponseHandler()));
  }
}
