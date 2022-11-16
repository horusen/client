import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  changerProfile(profile: any) {
    this.auth.changeProfile(profile);
  }
}
