import { BaseContainerComponentComponent } from "./../../../shared/component/base-container-component/base-container-component.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Component } from "@angular/core";
import { MembreCabinetMinistreService } from "./membre-cabinet-ministre.service";

@Component({
  selector: "app-membre-cabinet-ministre",
  templateUrl: "./membre-cabinet-ministre.component.html",
  styleUrls: ["./membre-cabinet-ministre.component.scss"],
})
export class MembreCabinetMinistreComponent extends BaseContainerComponentComponent {
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public membreCabinetService: MembreCabinetMinistreService
  ) {
    super(membreCabinetService, router, route);
    this.element = "membre-cabinet";
  }
}
