import { BaseContainerComponentComponent } from "./../../../shared/component/base-container-component/base-container-component.component";
import { Component, OnInit } from "@angular/core";
import { PresidentService } from "./president.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-president",
  templateUrl: "./president.component.html",
  styleUrls: ["./president.component.scss"],
})
export class PresidentComponent extends BaseContainerComponentComponent {
  constructor(
    public presidentService: PresidentService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(presidentService, router, route);
    this.element = "president";
  }
}
