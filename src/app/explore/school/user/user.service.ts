import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService {
  constructor() {
    super("user");
  }

  getWhoNotEmployedInService(service: number) {
    return this.factory
      .get(`etablissement/service/${service}/not-employe`)
      .pipe(tap(this.listResponseHandler()));
  }

  getNonAdminOnEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/admin/not`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }

  getNonChargerComOnEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/charger-com/not`)
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
