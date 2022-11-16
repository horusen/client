import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { MinistreGouvernementService } from "./ministre-gouvernement.service";

@Component({
  selector: "app-ministre-gouvernement",
  templateUrl: "./ministre-gouvernement.component.html",
  styleUrls: ["./ministre-gouvernement.component.scss"],
})
export class MinistreGouvernementComponent extends BaseContainerComponentComponent {
  constructor(
    public ministreService: MinistreGouvernementService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministreService, router, route);
    this.element = "ministre-gouvernement";
  }
}
