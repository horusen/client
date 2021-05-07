import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ParentEleveService } from "../parent-eleve.service";

@Component({
  selector: "app-parent-eleve-stats",
  templateUrl: "./parent-eleve-stats.component.html",
  styleUrls: ["./parent-eleve-stats.component.scss"],
})
export class ParentEleveStatsComponent extends BaseComponent implements OnInit {
  showBy: string;
  constantStatistiques: any;
  etablissement: any;
  constantStatistiquesLoading = false;

  constructor(
    public parentService: ParentEleveService,
    public etablissementService: EtablissementService
  ) {
    super(parentService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
      this.getConstantStats(etablissement?.id);
      this.getStats(etablissement?.id, "lien_parente");
    });
  }

  getStats(etablissement: number, item: string) {
    this.showBy = item;
    this.loading = true;
    this.parentService
      .getStatsByEtablissement(etablissement, { showBy: item })
      .subscribe((stats) => {
        this.data = stats;
        this.loading = false;
      });
  }

  getConstantStats(etablissement: number) {
    this.constantStatistiquesLoading = true;
    this.parentService
      .getStatsByEtablissement(etablissement)
      .subscribe((stats) => {
        this.constantStatistiques = stats;
        this.constantStatistiquesLoading = false;
      });
  }
}
