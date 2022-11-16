import { ParentDefinition } from "./../../shared/models/parent-definition.model";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { LiaisonService } from "./liaison.service";

@Component({
  selector: "app-liaison",
  templateUrl: "./liaison.component.html",
  styleUrls: ["./liaison.component.scss"],
})
export class LiaisonComponent extends BaseContainerComponentComponent {
  @Input() parent: ParentDefinition;
  @Input() colonne_affichage = 4;
  @Input() itemsPerPage = 8;
  constructor(
    public liaisonService: LiaisonService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(liaisonService, router, route);
    this.element = "liaison";
  }
}
