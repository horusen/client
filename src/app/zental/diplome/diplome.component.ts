import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DiplomeService } from "./diplome.service";

@Component({
  selector: "app-diplome",
  templateUrl: "./diplome.component.html",
  styleUrls: ["./diplome.component.scss"],
})
export class DiplomeComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  ajouter = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public diplomeService: DiplomeService
  ) {
    super(diplomeService, router, route);
    this.element = "diplome";
  }

  ngOnInit(): void {}
}
