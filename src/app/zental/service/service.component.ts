import { BaseContainerComponentComponent } from "./../../shared/component/base-container-component/base-container-component.component";
import { Component, Input } from "@angular/core";
import { ServiceService } from "./service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"],
})
export class ServiceComponent extends BaseContainerComponentComponent {
  constructor(
    public serviceService: ServiceService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(serviceService, router, route);
    this.element = "service";
  }
}
