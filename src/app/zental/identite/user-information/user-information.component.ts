import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/authentification/auth.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "../identite.service";

@Component({
  selector: "app-user-information",
  templateUrl: "./user-information.component.html",
  styleUrls: ["./user-information.component.scss"],
})
export class UserInformationComponent extends BaseComponent implements OnInit {
  user: any;
  constructor(public identiteService: IdentiteService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
      }
    );
  }
}
