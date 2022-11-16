import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { PosteService } from "./poste.service";

@Component({
  selector: "app-poste",
  templateUrl: "./poste.component.html",
  styleUrls: ["./poste.component.scss"],
})
export class PosteComponent extends BaseContainerComponentComponent {
  @Input() parent: { name: string; item: any };
  constructor(
    public posteService: PosteService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(posteService, router, route);
    this.element = "poste";
  }
}
