import { BaseContainerComponentComponent } from "./../../shared/component/base-container-component/base-container-component.component";
import { Component } from "@angular/core";
import { AmbassadeService } from "./ambassade.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-ambassade",
  templateUrl: "./ambassade.component.html",
  styleUrls: ["./ambassade.component.scss"],
})
export class AmbassadeComponent extends BaseContainerComponentComponent {
  constructor(
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ambassadeService, router, route);
    this.element = "ambassade";
  }
}
