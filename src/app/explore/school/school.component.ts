import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";

@Component({
  selector: "app-school",
  templateUrl: "./school.component.html",
  styleUrls: ["./school.component.scss"],
})
export class SchoolComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  deconnexion() {
    this.authService.deconnexion().subscribe();
  }
}
