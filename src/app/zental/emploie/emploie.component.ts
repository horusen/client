import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { EmploieService } from "./emploie.service";

@Component({
  selector: "app-emploie",
  templateUrl: "./emploie.component.html",
  styleUrls: ["./emploie.component.scss"],
})
export class EmploieComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public emploieService: EmploieService
  ) {
    super(emploieService, router, route);
    this.element = "emploie";
  }

  ngOnInit(): void {}
}
