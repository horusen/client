import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class ChargerCommunicationEtablissementService extends BaseService {
  constructor() {
    super("etablissement/charger-communication");
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/charger-communication`)
      .pipe(tap(this.listResponseHandler()));
  }
}
