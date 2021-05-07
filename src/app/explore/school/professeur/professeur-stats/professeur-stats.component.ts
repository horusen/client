import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ProfesseurService } from "../professeur.service";

@Component({
  selector: "app-professeur-stats",
  templateUrl: "./professeur-stats.component.html",
  styleUrls: ["./professeur-stats.component.scss"],
})
export class ProfesseurStatsComponent extends BaseComponent implements OnInit {
  showBy: string;
  constantStatistiques: any;
  constantStatistiquesLoading = false;

  constructor(
    public etablissementService: EtablissementService,
    public professeurService: ProfesseurService,
    public route: ActivatedRoute
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getConstantStats(etablissement?.id);
      this.getStats(etablissement?.id, "domaine");
    });
  }

  getStats(etablissement: number, item: string) {
    this.showBy = item;
    this.loading = true;
    this.professeurService
      .getStatsByEtablissement(etablissement, { showBy: item })
      .subscribe((stats) => {
        this.data = stats;
        this.loading = false;
      });
  }

  getConstantStats(etablissement: number) {
    this.constantStatistiquesLoading = true;
    this.professeurService
      .getStatsByEtablissement(etablissement)
      .subscribe((stats) => {
        this.constantStatistiques = stats;
        this.constantStatistiquesLoading = false;
      });
  }
}
