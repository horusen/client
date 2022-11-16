import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { IdentiteService } from "../identite/identite.service";
import { EmploieService } from "./emploie.service";

@Component({
  selector: "app-emploie",
  templateUrl: "./emploie.component.html",
  styleUrls: ["./emploie.component.scss"],
})
export class EmploieComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  user: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public emploieService: EmploieService,
    public identiteService: IdentiteService
  ) {
    super(emploieService, router, route);
    this.element = "emploie";
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
}
