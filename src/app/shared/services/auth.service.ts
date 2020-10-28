import { tap } from "rxjs/operators";
import { TokenStorage } from "./token-storage.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Factory } from "./factory";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private _factory: Factory, private _tokenStorage: TokenStorage) {}

  getUserByIdentifiant(identifiant: string) {
    return this._factory.get(`user/${identifiant}`);
  }

  public login(elements: { email: string; password: string }): Observable<any> {
    return this._factory.post("auth/login", elements).pipe(
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

  signup(elements: {}) {
    return this._factory.post("auth/login", elements).pipe(
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

  logout() {
    return this._factory.post("auth/logout", {}).pipe(
      tap({
        next: () => {
          this._tokenStorage.clear();
        },
      })
    );
  }

  private saveTokens(access_token: string, refresh_token: string, user: any) {
    this._tokenStorage.save(user, access_token, refresh_token);
  }

  get user(): any {
    // return this._userID;
    return this._tokenStorage.getUser();
  }
}
