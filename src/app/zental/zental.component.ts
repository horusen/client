import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../authentification/auth.service";

@Component({
  selector: "app-zental",
  templateUrl: "./zental.component.html",
  styleUrls: ["./zental.component.scss"],
})
export class ZentalComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.deconnexion().subscribe({
      next: () => {
        this.router.navigate(["/", "connexion"]);
      },
    });
  }
}
