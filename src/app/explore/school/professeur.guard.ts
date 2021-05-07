import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/authentification/auth.service";

@Injectable({
  providedIn: "root",
})
export class ProfesseurGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return (
      this.authService.selectedProfile.type === "professeur" ||
      this.router.navigate(["./"], { relativeTo: this.route })
    );
  }
}
