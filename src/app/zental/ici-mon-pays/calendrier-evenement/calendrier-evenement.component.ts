import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { BaseContainerComponentComponent } from "./../../../shared/component/base-container-component/base-container-component.component";
import { Component, OnInit } from "@angular/core";
import { CalendrierEvenementService } from "./calendrier-evenement.service";

@Component({
  selector: "app-calendrier-evenement",
  templateUrl: "./calendrier-evenement.component.html",
  styleUrls: ["./calendrier-evenement.component.scss"],
})
export class CalendrierEvenementComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  constructor(
    public calendrierService: CalendrierEvenementService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(calendrierService, router, route);
    this.element = "calendrier-evenement";
  }
}
