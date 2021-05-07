import { AuthService } from "./../../../authentification/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  deconnexion() {
    this.authService.deconnexion().subscribe();
  }
}
