import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { ConsulatService } from "./consulat.service";

@Component({
  selector: "app-consulat",
  templateUrl: "./consulat.component.html",
  styleUrls: ["./consulat.component.scss"],
})
export class ConsulatComponent extends BaseContainerComponentComponent {
  @Input() parent: ParentDefinition;
  @Input() colonne_affichage = 4;
  @Input() itemsPerPage = 8;
  constructor(
    public consulatService: ConsulatService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(consulatService, router, route);
    this.element = "consulat";
  }
}
