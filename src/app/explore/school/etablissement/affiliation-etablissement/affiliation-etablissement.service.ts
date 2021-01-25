import { tap } from "rxjs/operators";
import { BaseService } from "src/app/shared/services/base.service";
import { Injectable } from "@angular/core";
import { EtablissementService } from "../etablissement.service";

@Injectable({
  providedIn: "root",
})
export class AffiliationEtablissementService extends BaseService {
  constructor(public etablissementService: EtablissementService) {
    super("etablissement/affiliation");
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(response);

          this.etablissementService.unshiftItemInData(response.etablissement2);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }
}
