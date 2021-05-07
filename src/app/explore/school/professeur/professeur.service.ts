import { Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { AuthService } from "src/app/authentification/auth.service";

@Injectable({
  providedIn: "root",
})
export class ProfesseurService extends BaseService {
  constructor(public userService: AuthService) {
    super("professeur");
  }

  getByEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/professeur`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByEleve(eleve: number, params?: Params) {
    return this.factory
      .get(`eleve/${eleve}/professeur`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getHorsEtablissementMemePays(etablissement: number, params?: Params) {
    return this.factory
      .get(
        `etablissement/${etablissement}/professeur/hors-etablissement/meme-pays`,
        { params }
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getProfesseursInternationals(params?: Params) {
    return this.factory
      .get(`${this.endPoint}/international`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByUserClasse(params?: Params) {
    return this.factory
      .get(`user/professeur`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getByClasse(classe: number, params?: Params) {
    return this.factory
      .get(`classe/${classe}/professeur`, { params })
      .pipe(tap(this.listResponseHandler()));
  }

  getProfesseursDeMemesEtablissements(params?: Params) {
    return this.factory.get(`professeur/meme-etablissement`, { params }).pipe(
      tap({
        next: (data) => {
          this.data = data.filter(
            (prof: any) =>
              prof.professeur_details.id_inscription !=
              this.userService.user.id_inscription
          );
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getCurrentUserAsProfesseur() {
    return this.factory.get(`current-user/professeur`).pipe(
      tap({
        next: (professeur) => (this.singleData = professeur),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getStatsByEtablissement(etablissement: number, params?: Params) {
    return this.factory
      .get(`etablissement/${etablissement}/professeur/stats`, { params })
      .pipe(tap(this.onlyErrorResponseHandler()));
  }
}
