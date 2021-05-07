import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { GroupeService } from "../groupe.service";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-groupe-stats",
  templateUrl: "./groupe-stats.component.html",
  styleUrls: ["./groupe-stats.component.scss"],
})
export class GroupeStatsComponent extends BaseComponent implements OnInit {
  showBy: string;
  constantStatistiques: any;
  etablissement: any;
  constantStatistiquesLoading = false;

  constructor(
    public groupeService: GroupeService,
    public etablissementService: EtablissementService
  ) {
    super(groupeService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
      this.getConstantStats(etablissement?.id);
      this.getStats(etablissement?.id, "classe");
    });
  }

  getStats(etablissement: number, item: string) {
    this.showBy = item;
    this.loading = true;
    this.groupeService
      .getStatsByEtablissement(etablissement, { showBy: item })
      .subscribe((stats) => {
        this.data = stats;
        this.loading = false;
      });
  }

  getConstantStats(etablissement: number) {
    this.constantStatistiquesLoading = true;
    this.groupeService
      .getStatsByEtablissement(etablissement)
      .subscribe((stats) => {
        this.constantStatistiques = stats;
        this.constantStatistiquesLoading = false;
      });
  }
}
