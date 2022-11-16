import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseContainerComponentComponent } from "src/app/shared/component/base-container-component/base-container-component.component";
import { IdentiteService } from "../../identite/identite.service";
import { RelationFamilialeService } from "../../relation-familiale/relation-familiale.service";

@Component({
  selector: "app-enfant",
  templateUrl: "./enfant.component.html",
  styleUrls: ["./enfant.component.scss"],
})
export class EnfantComponent
  extends BaseContainerComponentComponent
  implements OnInit
{
  user: any;
  constructor(
    public relationFamilialeService: RelationFamilialeService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(relationFamilialeService, router, route);
    this.element = "enfant";
  }

  ngOnInit(): void {
    this._subscription["user"] = this.identiteService.user$.subscribe(
      (user) => {
        if (this.user?.id_inscription !== user.id_inscription) this.user = user;
      }
    );
  }

  onEnfantCreated(): void {
    this.router.navigate(["./"], { relativeTo: this.route });
    this.helper.hideModal("enfant-create-modal");
  }
}
