import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { PasserelleService } from "./passerelle.service";

@Component({
  selector: "app-passerelle",
  templateUrl: "./passerelle.component.html",
  styleUrls: ["./passerelle.component.scss"],
})
export class PasserelleComponent extends BaseContainerComponentComponent {
  @Input() parent: ParentDefinition;
  constructor(
    public passerelleService: PasserelleService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(passerelleService, router, route);
    this.element = "passerelle";
  }
}
