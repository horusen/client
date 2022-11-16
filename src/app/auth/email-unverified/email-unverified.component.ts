import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-email-unverified",
  templateUrl: "./email-unverified.component.html",
  styleUrls: ["./email-unverified.component.scss"],
})
export class EmailUnverifiedComponent extends BaseComponent implements OnInit {
  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
    if (this.auth.user.email_verified_at) {
      this.router.navigate(["identite"]);
    }
  }

  resendEmailVerification(user: number): void {
    this.loading = true;
    this.auth.resendEmailVerification(user).subscribe({
      next: () => {
        this.helper.alertSuccess();
        this.loading = false;
      },
      error: () => {
        this.helper.alertDanger();
        this.loading = false;
      },
    });
  }
}
