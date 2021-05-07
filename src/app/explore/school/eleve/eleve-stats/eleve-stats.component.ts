import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EleveService } from "../../eleve.service";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-eleve-stats",
  templateUrl: "./eleve-stats.component.html",
  styleUrls: ["./eleve-stats.component.scss"],
})
export class EleveStatsComponent extends BaseComponent implements OnInit {
  constantStatistiques: any;
  constantStatistiquesLoading = false;
  constructor(
    public eleveService: EleveService,
    public etablissementService: EtablissementService
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getConstantStats(etablissement.id);
      this.getStats(etablissement.id, "classe");
    });
  }

  getStats(etablissement: number, item?: string) {
    this.loading = true;
    this.eleveService
      .getStatsByEtablissement(etablissement, { showBy: item })
      .subscribe((stats) => {
        this.data = stats;
        this.loading = false;
      });
  }

  getConstantStats(etablissement: number) {
    this.constantStatistiquesLoading = true;
    this.eleveService
      .getStatsByEtablissement(etablissement)
      .subscribe((stats) => {
        this.constantStatistiques = stats;
        this.constantStatistiquesLoading = false;
      });
  }
}
