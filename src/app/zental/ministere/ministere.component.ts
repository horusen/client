import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { MinistereService } from "./ministere.service";

@Component({
  selector: "app-ministere",
  templateUrl: "./ministere.component.html",
  styleUrls: ["./ministere.component.scss"],
})
export class MinistereComponent
  extends BaseContainerComponentComponent
  implements AfterViewInit
{
  @Input() parent: ParentDefinition;
  constructor(
    public ministereService: MinistereService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(ministereService, router, route);
    this.element = "ministere";
  }
  ngAfterViewInit(): void {}
}
