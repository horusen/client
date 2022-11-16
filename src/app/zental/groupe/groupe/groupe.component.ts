import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { GroupeService } from "./groupe.service";

@Component({
  selector: "app-groupe",
  templateUrl: "./groupe.component.html",
  styleUrls: ["./groupe.component.scss"],
})
export class GroupeComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  @Input() parent: ParentDefinition;
  constructor(
    public groupeService: GroupeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(groupeService, router, route);
    this.element = "groupe";
  }

  ngOnInit(): void {}
}
