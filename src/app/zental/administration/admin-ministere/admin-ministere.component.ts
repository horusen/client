import { BaseContainerComponentComponent } from "./../../../shared/component/base-container-component/base-container-component.component";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";

@Component({
  selector: "app-admin-ministere",
  templateUrl: "./admin-ministere.component.html",
  styleUrls: ["./admin-ministere.component.scss"],
})
export class AdminMinistereComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public ministereService: MinistereService
  ) {
    super(ministereService, router, route);
    this.element = "ministere";
  }

  // ngAfterViewInit(): void {}
}
