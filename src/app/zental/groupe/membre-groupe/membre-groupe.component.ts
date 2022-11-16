import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { MembreGroupeService } from "./membre-groupe.service";

@Component({
  selector: "app-membre-groupe",
  templateUrl: "./membre-groupe.component.html",
  styleUrls: ["./membre-groupe.component.scss"],
})
export class MembreGroupeComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  constructor(
    public membreGroupeService: MembreGroupeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(membreGroupeService, router, route);
    this.element = "membre-groupe";
  }

  ngOnInit(): void {}
}
