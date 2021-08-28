import { BaseComponent } from "./../../../shared/components/base-component/base.component";
import { ActivatedRoute, Router } from "@angular/router";
import { IdentiteService } from "./../identite.service";
import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "../../user/user.service";

@Component({
  selector: "app-identite-min",
  templateUrl: "./identite-min.component.html",
  styleUrls: ["./identite-min.component.scss"],
})
export class IdentiteMinComponent extends BaseComponent implements OnInit {
  @Input() user: any;
  constructor(
    public identiteService: IdentiteService,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.identiteService.user = this.user;
  }
}
