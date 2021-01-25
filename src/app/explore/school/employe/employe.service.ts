import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class EmployeService extends BaseService {
  constructor() {
    super("employe");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/employe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getByTypeEtablissement(typeEtablissement: number) {
    return this.factory
      .get(`etablissement/type/${typeEtablissement}/employe`)
      .pipe(tap(this.listResponseHandler()));
  }
}
