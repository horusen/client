import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-deconnexion",
  templateUrl: "./deconnexion.component.html",
  styleUrls: ["./deconnexion.component.scss"],
})
export class DeconnexionComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.auth.deconnexion().subscribe({
      next: () => {
        this.router.navigate(["/", "connextion"]);
      },
    });
  }
}
