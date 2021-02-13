import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";

@Injectable({
  providedIn: "root",
})
export class EtablissementService extends BaseService {
  typeEtablissement: number;
  constructor() {
    super("etablissement");
  }

  get etablissement() {
    return JSON.parse(localStorage.getItem("etablissement"));
  }

  getTypeEtablissementsAffilies() {
    return this.factory.get(
      `${this.endPoint}/${this.etablissement.id}/affiliations/type`
    );
  }

  getAffiliatedToUserByType(type: number) {
    return this.factory
      .get(`type/${type}/etablissement/affiliated`)
      .pipe(tap(this.listResponseHandler()));
  }

  getEtablissementsAffilies(keyword?: string) {
    return this.factory
      .get(
        keyword
          ? `${this.endPoint}/${this.etablissement.id}/affiliations?query=${keyword}`
          : `${this.endPoint}/${this.etablissement.id}/affiliations`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getEtablissementsAffiliesByType(type: number, keyword?: string) {
    return this.factory
      .get(
        keyword
          ? `type/${type}/${this.endPoint}/${this.etablissement.id}/affiliations?query=${keyword}`
          : `type/${type}/${this.endPoint}/${this.etablissement.id}/affiliations`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  private _getEtablissementsNonAffiliesByType(type: number) {
    return this.factory.get(
      `type/${type}/${this.endPoint}/${this.etablissement.id}/affiliations/not`
    );
  }

  getEtablissementsNonAffiliesByTypeLocally(type: number) {
    return this._getEtablissementsNonAffiliesByType(type).pipe(
      tap(this.onlyErrorResponseHandler())
    );
  }

  getEtablissementsNonAffiliesByType(type: number) {
    return this._getEtablissementsNonAffiliesByType(type).pipe(
      tap({
        next: (data) => {
          this.data = data;
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getEtablissementsInternationalesByType(type: number, keyword?: string) {
    this.typeEtablissement = type;
    return this.factory
      .get(
        keyword
          ? `type/${type}/${this.endPoint}/international?query=${keyword}`
          : `type/${type}/${this.endPoint}/international`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getEtablissementsWhereUserIsAdmin() {
    return this.factory
      .get(`${this.endPoint}/admin/user`)
      .pipe(tap(this.listResponseHandler()));
  }

  searchEtablissementInternationalByType(type: number, keyword?: string) {
    return this.factory
      .post(`type/${type}/${this.endPoint}/international/search`, { keyword })
      .pipe(tap(this.listResponseHandler()));
  }

  getCurrentUserPrivilege(etablissement: number) {
    return this.factory.get(`${this.endPoint}/${etablissement}/privilege`);
  }
}
