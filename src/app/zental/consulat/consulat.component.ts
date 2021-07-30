import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { ConsulatService } from "./consulat.service";

@Component({
  selector: "app-consulat",
  templateUrl: "./consulat.component.html",
  styleUrls: ["./consulat.component.scss"],
})
export class ConsulatComponent extends BaseContainerComponentComponent {
  constructor(
    public consulatService: ConsulatService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(consulatService, router, route);
    this.element = "consulat";
  }
}
