import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AffectationTacheService } from "../../affectation-tache/affectation-tache.service";
import { TunelService } from "../tunel.service";

@Component({
  selector: "app-tunel-list",
  templateUrl: "./tunel-list.component.html",
  styleUrls: ["./tunel-list.component.scss"],
})
export class TunelListComponent extends BaseComponent implements OnInit {
  constructor(
    public tunelService: TunelService,
    public affectationTacheService: AffectationTacheService
  ) {
    super(tunelService);
  }

  ngOnInit(): void {
    this._subscription[
      "tache"
    ] = this.affectationTacheService.singleData$.subscribe(
      (affectationTache) => {
        this.getData(affectationTache.id);
      }
    );
  }

  getData(affectationTache: number) {
    this.loading = true;
    this.tunelService.getByAffectationTache(affectationTache).subscribe(() => {
      this.loading = false;
    });
  }

  select(tunel: any) {
    this.tunelService.singleData = tunel;
  }
}
