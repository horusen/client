import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
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
  constructor(
    public contactService: ContactUserService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(contactService, router, route);
    this.element = "contact";
  }

  ngOnInit(): void {}
}
