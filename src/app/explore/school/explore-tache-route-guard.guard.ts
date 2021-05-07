import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/authentification/auth.service";

@Injectable({
  providedIn: "root",
})
export class ExploreTacheRouteGuardGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.selectedProfile.type === "professeur") {
      this.router.navigate(["/school/professeur"]);
    }

    return true;
  }
}
