import { RelationInterpersonnelleService } from "./relation-interpersonnelle.service";
import { Component, OnInit } from "@angular/core";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-relation-interpersonnelle",
  templateUrl: "./relation-interpersonnelle.component.html",
  styleUrls: ["./relation-interpersonnelle.component.scss"],
})
export class RelationInterpersonnelleComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  constructor(
    public relationService: RelationInterpersonnelleService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(relationService, router, route);
    this.element = "relation";
  }

  ngOnInit(): void {}
}
