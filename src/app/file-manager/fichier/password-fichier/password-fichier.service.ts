import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/services/base.service";
import { FichierService } from "../fichier.service";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PasswordFichierService extends BaseService {
  private _fichier: any;
  public fichier$ = new Subject<any>();
  public processPassword$ = new Subject<{
    fichier: any;
    typeProcess: string;
  }>();

  setFichier(fichier: any) {
    this._fichier = fichier;
    this.fichier$.next(fichier);
  }

  constructor(public fichierService: FichierService) {
    super("fichier/password");
  }

  processPassword(fichier: any, typeProcess: string) {
    this.processPassword$.next({ fichier, typeProcess });
  }

  verifyPasswordExists(fichier: number) {
    return this.factory.get(`fichier/${fichier}/password/verify`).pipe(
      tap({
        next: (response) => {
          this.getFichierFromFichierService(fichier).has_password =
            response.has_password;
        },
      })
    );
  }

  checkPassword(elements: { fichier: number; password: string }) {
    return this.factory.post(`fichier/password/check`, elements).pipe(
      tap({
        next: (response) => {
          if (response.password_checked) {
            this.getFichierFromFichierService(
              elements.fichier
            ).has_password = false;
          }
        },
      })
    );
  }

  add(elements: { fichier: number; password: string }) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: () => {
          this.getFichierFromFichierService(
            elements.fichier
          ).has_password = true;
        },
      })
    );
  }

  edit(elements: { fichier: number; password: string }): Observable<any> {
    return this.factory.put(this.endPoint, elements);
  }

  delete(fichier: number) {
    return this.factory.delete(`fichier/${fichier}/password`).pipe(
      tap({
        next: () => {
          this.getFichierFromFichierService(fichier).has_password = false;
        },
      })
    );
  }

  getFichierFromFichierService(fichier: number): any {
    const indexFichier = this.fichierService.findIndexItemInDataByID(fichier);
    return this.fichierService.data[indexFichier];
  }
}
