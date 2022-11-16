import { ActivatedRoute } from "@angular/router";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { CitoyenService } from "./citoyen.service";

@Component({
  selector: "app-citoyen",
  templateUrl: "./citoyen.component.html",
  styleUrls: ["./citoyen.component.scss"],
})
export class CitoyenComponent extends BaseContainerComponentComponent {
  @Input() parent: { name: string; item: any };
  constructor(
    public citoyenService: CitoyenService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(citoyenService, router, route);
    this.element = "citoyen";
  }
}
