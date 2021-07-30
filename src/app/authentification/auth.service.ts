import { tap } from "rxjs/operators";
import { TokenStorage } from "../shared/services/token-storage.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Factory } from "../shared/services/factory";
import { Router } from "@angular/router";
import { Helper } from "../shared/services/helper";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private _factory: Factory,
    private _tokenStorage: TokenStorage,
    public router: Router,
    public helper: Helper
  ) {}

  getUserByIdentifiant(identifiant: string) {
    return this._factory.get(`user/${identifiant}`);
  }

  public connexion(elements: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._factory.post("auth/login", elements).pipe(
      tap({
        next: (token) => {
          this._tokenStorage.save(token);
          this.router.navigate(["./"]);
          // this.changeProfile(this.profiles[0]);
        },
      })
    );
  }

  incsription(elements: {}) {
    return this._factory.post("auth/signup", elements).pipe(
      tap({
        next: (token) => {
          this._tokenStorage.save(token);
          this.changeProfile(this.selectedProfile);
        },
      })
    );
  }

  deconnexion() {
    return this._factory.get("auth/deconnexion").pipe(
      tap({
        next: () => {
          this._tokenStorage.clear();
          this.router.navigate(["connexion"]);
        },
      })
    );
  }

  get user(): any {
    // return this._userID;
    return this._tokenStorage.getUser();
  }

  get selectedProfile(): any {
    return this._tokenStorage.getSelectedProfile();
  }

  get profiles(): any[] {
    const profiles = this._tokenStorage.getProfiles();
    return this.selectedProfile
      ? profiles.filter(
          (profil: any) => profil.profil.id != this.selectedProfile.profil.id
        )
      : profiles;
  }

  changeProfile(profile: any) {
    this._tokenStorage.changeSelectedProfile(profile);
    if (profile.type == "eleve") {
      // la methode navigate by url est utilisé pour recharger la page
      // this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.url.includes("school/tache")
        ? this.helper.reloadPage(["school", "tache"])
        : this.router.navigate(["school", "tache"]);
      // });
    } else if (profile.type == "professeur") {
      // this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.url.includes("school/professeur")
        ? this.helper.reloadPage(["school", "professeur"])
        : this.router.navigate(["school", "professeur"]);
      // });
    } else if (profile.type == "employe") {
      // this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.url.includes("school/echo")
        ? this.helper.reloadPage(["school", "echo"])
        : this.router.navigate(["school", "echo"]);
      // });
    }
  }

  isLoggedIn() {
    return this._tokenStorage.getAccessToken();
  }
}
