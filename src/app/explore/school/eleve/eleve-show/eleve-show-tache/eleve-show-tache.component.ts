import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../../eleve.service";
import { AffectationTacheService } from "../../../tache/affectation-tache/affectation-tache.service";

@Component({
  selector: "app-eleve-show-tache",
  templateUrl: "./eleve-show-tache.component.html",
  styleUrls: ["./eleve-show-tache.component.scss"],
})
export class EleveShowTacheComponent extends BaseComponent implements OnInit {
  constructor(
    public eleveService: EleveService,
    public affectationTacheService: AffectationTacheService,
    public route: ActivatedRoute
  ) {
    super(affectationTacheService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this._subscription["eleve"] = this.eleveService.singleData$.subscribe(
        (eleve) => {
          this.getData(eleve.id, params);
        }
      );
    });
  }

  getData(eleve: number, params: any): void {
    this.loading = true;
    this.affectationTacheService.getByEleve(eleve, params).subscribe(() => {
      this.loading = false;
    });
  }
}
