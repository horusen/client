import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { ProgrammeService } from "../../programme.service";
import { EtablissementService } from "../../etablissement/etablissement.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-programme-stats",
  templateUrl: "./programme-stats.component.html",
  styleUrls: ["./programme-stats.component.scss"],
})
export class ProgrammeStatsComponent extends BaseComponent implements OnInit {
  showBy: string;
  etablissement: any;
  constructor(
    public programmeService: ProgrammeService,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(programmeService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
      this.getData("type");
    });
  }

  getData(itemToShow: string): void {
    if (this.etablissement) {
      this.showBy = itemToShow;

      this.loading = true;
      this.programmeService
        .getStatsByEtablissement(this.etablissement.id, { showBy: itemToShow })
        .subscribe((data) => {
          this.data = data;
          this.loading = false;
        });
    } else {
      this.helper.toastDanger("ERREUR", "Aucun etablissement séléctionné");
    }
  }
}
