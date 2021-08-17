import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/authentification/auth.service";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { UserService } from "src/app/zental/user/user.service";
import { IdentiteService } from "./identite.service";

@Component({
  selector: "app-identite",
  templateUrl: "./identite.component.html",
  styleUrls: ["./identite.component.scss"],
})
export class IdentiteComponent extends BaseSingleComponent implements OnInit {
  user: any;
  constructor(
    public authService: AuthService,
    public userService: UserService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute
  ) {
    super(userService, route);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id === "current-user") {
        this.user = this.auth.user;
        this.identiteService.user = this.auth.user;
      } else {
        this.userService.getSingle(+params.id, false).subscribe((user) => {
          this.identiteService.user = user;
        });
      }
    });

    this._subscription["user"] = this.identiteService.user$.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
}
