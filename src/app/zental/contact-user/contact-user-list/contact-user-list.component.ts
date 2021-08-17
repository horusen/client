import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "../../identite/identite.service";
import { ContactUserService } from "../contact-user.service";

@Component({
  selector: "app-contact-user-list",
  templateUrl: "./contact-user-list.component.html",
  styleUrls: ["./contact-user-list.component.scss"],
})
export class ContactUserListComponent extends BaseComponent implements OnInit {
  constructor(
    public contactService: ContactUserService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute
  ) {
    super(contactService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.route.queryParams.subscribe((params) => {
          this.getData(user.id_inscription, params);
        });
      }
    );
  }

  getData(user: number, params: Params): void {
    this.loading = true;
    this.contactService.getByUser(user, params).subscribe(() => {
      this.loading = false;
      console.log(this.contactService.data);
    });
  }
}
