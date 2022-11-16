import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ContactUserService } from "src/app/zental/contact-user/contact-user.service";
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
    public contactService: ContactUserService,
    public contactUrgentService: ContactUrgentService,
    public identiteService: IdentiteService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["itemCreated"] =
      this.contactService.lastItemcreated$.subscribe((contact) => {
        if (contact.urgence) {
          this.contactUrgentService.unshiftItemInData(contact);
          this.data.unshift(contact);

          if (!this.contactUrgentService.singleData) {
            this.contactUrgentService.singleData = contact;
          }
        }
      });

    this._subscription["itemDeleted"] =
      this.contactService.lastItemDeleted$.subscribe((contact) => {
        if (contact.urgence) {
          this.contactUrgentService.deleteItemInData(contact.id);
          this.data = this.data.filter((item) => contact.id !== item.id);

          if (contact.id === this.contactUrgentService.singleData.id) {
            this.contactUrgentService.singleData = this.data[0];
          }
        }
      });

    this._subscription["single"] =
      this.contactUrgentService.singleData$.subscribe((single) => {
        this.data = this.contactUrgentService.data.filter(
          (contact) => contact.id !== single.id
        );
      });

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
