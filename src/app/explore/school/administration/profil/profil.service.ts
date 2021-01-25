import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ProfilService extends BaseService {
  constructor(public router: Router) {
    super("administration/profil");
  }

  getProfilEtablissementByHierarchie(
    etablissement: number,
    hierarchie: number
  ) {
    return this.factory
      .get(
        `etablissement/${etablissement}/administration/hierarchie/${hierarchie}/profil`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  getByEtablissement(etablissement: number) {
    return this.factory
      .get(`etablissement/${etablissement}/administration/profil`)
      .pipe(tap(this.listResponseHandler()));
  }
}
