import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BaseSingleComponent } from "src/app/shared/components/base-component/base-single.component";
import { ContactUrgentService } from "../contact-urgent.service";

@Component({
  selector: "app-contact-urgent-show",
  templateUrl: "./contact-urgent-show.component.html",
  styleUrls: ["./contact-urgent-show.component.scss"],
})
export class ContactUrgentShowComponent
  extends BaseSingleComponent
  implements OnInit
{
  constructor(
    public contactUrgentService: ContactUrgentService,
    public route: ActivatedRoute
  ) {
    super(contactUrgentService, route);
  }

  ngOnInit(): void {
    this.enableFetchDataFromURL = false;
    super.ngOnInit();
  }
}
