import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { IdentiteService } from "../identite/identite.service";
import { ContactUserService } from "./contact-user.service";

@Component({
  selector: "app-contact-user",
  templateUrl: "./contact-user.component.html",
  styleUrls: ["./contact-user.component.scss"],
})
export class ContactUserComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  user: any;
  constructor(
    public contactService: ContactUserService,
    public route: ActivatedRoute,
    public router: Router,
    public identiteService: IdentiteService
  ) {
    super(contactService, router, route);
    this.element = "contact";
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
}
