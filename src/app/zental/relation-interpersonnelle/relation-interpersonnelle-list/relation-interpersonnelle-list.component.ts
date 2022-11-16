import { RelationInterpersonnelleService } from "./../relation-interpersonnelle.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ActivatedRoute, Params } from "@angular/router";
import { IdentiteService } from "../../identite/identite.service";

@Component({
  selector: "app-relation-interpersonnelle-list",
  templateUrl: "./relation-interpersonnelle-list.component.html",
  styleUrls: ["./relation-interpersonnelle-list.component.scss"],
})
export class RelationInterpersonnelleListComponent
  extends BaseComponent
  implements OnInit
{
  constructor(
    public relationService: RelationInterpersonnelleService,
    public identiteService: IdentiteService,
    public route: ActivatedRoute
  ) {
    super(relationService);
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.route.queryParams.subscribe((params) => {
          this.getData(user.id_inscription, params);
        });
      }
    );
  }

  getData(user: number, params: Params): void {
    this.loading = true;
    this.relationService.getByUser(user, params).subscribe(() => {
      this.loading = false;
      console.log(this.relationService.data);
    });
  }
}
