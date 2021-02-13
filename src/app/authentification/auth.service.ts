import { tap } from "rxjs/operators";
import { TokenStorage } from "../shared/services/token-storage.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Factory } from "../shared/services/factory";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private _factory: Factory, private _tokenStorage: TokenStorage, public router: Router) { }

  getUserByIdentifiant(identifiant: string) {
    return this._factory.get(`user/${identifiant}`);
  }

  public connexion(elements: { email: string; password: string }): Observable<any> {
    return this._factory.post("auth/connexion", elements).pipe(
      tap({
        next: (tokens) => {

          this.saveTokens(
            tokens.access_token,
            tokens.refresh_token,
            tokens.user
          );

          this.router.navigate(['school', 'explore'])
        },
      })
    );
  }

  incsription(elements: {}) {
    return this._factory.post("auth/inscription", elements).pipe(
      tap({
        next: (tokens) => {
          this.saveTokens(
            tokens.access_token,
            tokens.refresh_token,
            tokens.user
          );
        },
      })
    );
  }

  deconnexion() {
    return this._factory.get("auth/deconnexion").pipe(
      tap({
        next: () => {
          this._tokenStorage.clear();
          this.router.navigate(['connexion'])
        },
      })
    );
  }

  saveTokens(access_token: string, refresh_token: string, user: any) {
    this._tokenStorage.save(user, access_token, refresh_token);
  }

  get user(): any {
    // return this._userID;
    return this._tokenStorage.getUser();
  }
}
