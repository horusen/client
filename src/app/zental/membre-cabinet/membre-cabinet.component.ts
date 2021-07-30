import { MembreCabinetService } from "./membre-cabinet.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";

@Component({
  selector: "app-membre-cabinet",
  templateUrl: "./membre-cabinet.component.html",
  styleUrls: ["./membre-cabinet.component.scss"],
})
export class MembreCabinetComponent extends BaseContainerComponentComponent {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public membreCabinetService: MembreCabinetService
  ) {
    super(membreCabinetService, router, route);
    this.element = "membre-cabinet";
  }
}
