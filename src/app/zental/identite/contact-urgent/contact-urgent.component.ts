import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ContactUrgentService } from "./contact-urgent.service";

@Component({
  selector: "app-contact-urgent",
  templateUrl: "./contact-urgent.component.html",
  styleUrls: ["./contact-urgent.component.scss"],
})
export class ContactUrgentComponent extends BaseComponent implements OnInit {
  single: any;
  constructor(public contactUrgentService: ContactUrgentService) {
    super();
  }

  ngOnInit(): void {
    this._subscription["loading"] =
      this.contactUrgentService.loading$.subscribe((loading) => {
        this.loading = loading;
      });

    this._subscription["single"] =
      this.contactUrgentService.singleData$.subscribe((single) => {
        this.single = single;
      });
  }
}
