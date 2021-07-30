import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { PasserelleService } from "./passerelle.service";

@Component({
  selector: "app-passerelle",
  templateUrl: "./passerelle.component.html",
  styleUrls: ["./passerelle.component.scss"],
})
export class PasserelleComponent extends BaseContainerComponentComponent {
  constructor(
    public passerelleService: PasserelleService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(passerelleService, router, route);
    this.element = "passerelle";
  }
}
