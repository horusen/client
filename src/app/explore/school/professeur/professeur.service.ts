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

  getByEtablissement(etablissement: number, keyword?: string) {
    return this.factory
      .get(
        keyword
          ? `etablissement/${etablissement}/professeur?query=${keyword}`
          : `etablissement/${etablissement}/professeur`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getHorsEtablissementMemePays(etablissement: number, keyword?: string) {
    return this.factory
      .get(
        keyword
          ? `etablissement/${etablissement}/professeur/hors-etablissement/meme-pays?query=${keyword}`
          : `etablissement/${etablissement}/professeur/hors-etablissement/meme-pays`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getProfesseursInternationals(keyword?: string) {
    return this.factory
      .get(
        keyword
          ? `${this.endPoint}/international?query=${keyword}`
          : `${this.endPoint}/international`
      )
      .pipe(tap(this.listResponseHandler()));
  }

  getByUserClasse(keyword?: string) {
    return this.factory
      .get(keyword ? `user/professeur?query=${keyword}` : `user/professeur`)
      .pipe(tap(this.listResponseHandler()));
  }


  getByClasse(classe: number, keyword: string) {
    return this.factory
      .get(
        keyword
          ? `classe/${classe}/professeur?query=${keyword}`
          : `classe/${classe}/professeur`
      )
      .pipe(
        tap(this.listResponseHandler())
      ); 
  }

  getAutresDeMemesEtablissements(keyword?: string) {
    return this.factory
      .get(
        keyword
          ? `professeur/memes-etablissements?query=${keyword}`
          : `professeur/memes-etablissements`
      )
      .pipe(
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
}
