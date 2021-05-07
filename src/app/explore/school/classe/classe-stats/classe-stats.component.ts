import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ClasseService } from "../classe.service";

@Component({
  selector: "app-classe-stats",
  templateUrl: "./classe-stats.component.html",
  styleUrls: ["./classe-stats.component.scss"],
})
export class ClasseStatsComponent extends BaseComponent implements OnInit {
  etablissement: any;
  showBy: string;
  constantStatistiques: any;
  constantStatistiquesLoading = false;
  constructor(
    public classeService: ClasseService,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(classeService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;

      this.getConstantStats(this.etablissement?.id);
      this.getStats(this.etablissement?.id, "formation");
    });
  }

  getStats(etablissement: number, item: string) {
    this.showBy = item;
    this.loading = true;
    this.classeService
      .getStatsbyEtablissement(etablissement, { showBy: item })
      .subscribe((stats) => {
        this.data = stats;
        this.loading = false;
      });
  }

  getConstantStats(etablissement: number) {
    this.constantStatistiquesLoading = true;
    this.classeService
      .getStatsbyEtablissement(etablissement)
      .subscribe((stats) => {
        this.constantStatistiques = stats;
        this.constantStatistiquesLoading = false;
      });
  }
}
