import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { IdentiteService } from "../../identite.service";
import { ContactUrgentService } from "../contact-urgent.service";

@Component({
  selector: "app-contact-urgent-list",
  templateUrl: "./contact-urgent-list.component.html",
  styleUrls: ["./contact-urgent-list.component.scss"],
})
export class ContactUrgentListComponent
  extends BaseComponent
  implements OnInit
{
  user: any;
  constructor(
    public contactUrgentService: ContactUrgentService,
    public identiteService: IdentiteService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["user"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
        this.getData(user.id_inscription);
      }
    );
  }

  getData(user: number): void {
    this.loading = true;
    this.contactUrgentService.getContactUrgentByUser(user).subscribe((data) => {
      this.contactUrgentService.singleData = data[0];
      this.loading = false;
    });
  }

  show(contact: any): void {
    this.contactUrgentService.singleData = contact;
  }
}
