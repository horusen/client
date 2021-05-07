import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { EmployeService } from "../employe.service";

@Component({
  selector: "app-employe-stats",
  templateUrl: "./employe-stats.component.html",
  styleUrls: ["./employe-stats.component.scss"],
})
export class EmployeStatsComponent extends BaseComponent implements OnInit {
  showBy: string;
  constantStatistiques: any;
  etablissement: any;
  constantStatistiquesLoading = false;
  constructor(
    public employeService: EmployeService,
    public etablissementService: EtablissementService
  ) {
    super(employeService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
      this.getConstantStats(etablissement?.id);
      this.getStats(etablissement?.id, "fonction");
    });
  }

  getStats(etablissement: number, item: string) {
    this.showBy = item;
    this.loading = true;
    this.employeService
      .getStatsByEtablissement(etablissement, { showBy: item })
      .subscribe((stats) => {
        this.data = stats;
        this.loading = false;
      });
  }

  getConstantStats(etablissement: number) {
    this.constantStatistiquesLoading = true;
    this.employeService
      .getStatsByEtablissement(etablissement)
      .subscribe((stats) => {
        this.constantStatistiques = stats;
        this.constantStatistiquesLoading = false;
      });
  }
}
