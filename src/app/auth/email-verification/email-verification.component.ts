import { BaseComponent } from "./../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-email-verification",
  templateUrl: "./email-verification.component.html",
  styleUrls: ["./email-verification.component.scss"],
})
export class EmailVerificationComponent
  extends BaseComponent
  implements OnInit
{
  constructor(public router: Router, public route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => [
      this.verifyEmail(this.auth.user.id_inscription, queryParams),
    ]);
  }

  verifyEmail(user: number, params: Params): void {
    this.loading = true;
    this.auth.verifyEmail(user, params).subscribe({
      next: () => {
        this.helper.alertSuccess();
        this.router.navigate(["/identite"]);
        this.loading = false;
      },
      error: () => {
        this.helper.alertDanger("L'URL de verifaction est expiré/invalide");
        this.router.navigate([""]);
        this.loading = false;
      },
    });
  }
}
