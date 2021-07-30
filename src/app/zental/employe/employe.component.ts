import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { EmployeService } from "./employe.service";

@Component({
  selector: "app-employe",
  templateUrl: "./employe.component.html",
  styleUrls: ["./employe.component.scss"],
})
export class EmployeComponent extends BaseContainerComponentComponent {
  @Input() parent: string;
  constructor(
    public employeService: EmployeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(employeService, router, route);
    this.element = "rh";
  }
}
