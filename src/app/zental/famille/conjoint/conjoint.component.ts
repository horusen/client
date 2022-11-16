import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ConjointService } from "../../conjoint/conjoint.service";
import { IdentiteService } from "../../identite/identite.service";

@Component({
  selector: "app-conjoint",
  templateUrl: "./conjoint.component.html",
  styleUrls: ["./conjoint.component.scss"],
})
export class ConjointComponent extends BaseComponent implements OnInit {
  create = false;
  user: any;
  constructor(
    public identiteService: IdentiteService,
    public conjointService: ConjointService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscription["identite"] = this.identiteService.user$.subscribe(
      (user) => {
        this.create = user.situation_matrimoniale.id === 5;
      }
    );

    this._subscription["item_created"] =
      this.conjointService.lastItemcreated$.subscribe((conjoint) => {
        // Afficher les details du conjoints
        this.create = false;
      });
  }
}
