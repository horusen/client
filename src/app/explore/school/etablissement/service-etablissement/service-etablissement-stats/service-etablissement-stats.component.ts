import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement.service";
import { ServiceEtablissementService } from "../service-etablissement.service";

@Component({
  selector: "app-service-etablissement-stats",
  templateUrl: "./service-etablissement-stats.component.html",
  styleUrls: ["./service-etablissement-stats.component.scss"],
})
export class ServiceEtablissementStatsComponent
  extends BaseComponent
  implements OnInit {
  showBy: string;
  etablissement: any;

  constructor(
    public etablissementService: EtablissementService,
    public serviceEtablissementService: ServiceEtablissementService
  ) {
    super(serviceEtablissementService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
      this.getStats(this.etablissement.id, "domaine");
    });
  }

  getStats(etablissement: number, item: string) {
    this.loading = true;
    this.serviceEtablissementService
      .getStatsByEtablissement(etablissement, { showBy: item })
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
      });
  }
}
