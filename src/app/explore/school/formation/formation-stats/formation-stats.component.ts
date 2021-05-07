import { FormationService } from "./../formation.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../../etablissement/etablissement.service";

@Component({
  selector: "app-formation-stats",
  templateUrl: "./formation-stats.component.html",
  styleUrls: ["./formation-stats.component.scss"],
})
export class FormationStatsComponent extends BaseComponent implements OnInit {
  showBy: string;
  etablissement: any;
  constructor(
    public formationService: FormationService,
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(formationService);
  }

  ngOnInit(): void {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.etablissement = etablissement;
      this.getData("programme");
    });
  }

  getData(itemToShow: string): void {
    if (this.etablissement) {
      this.showBy = itemToShow;

      this.loading = true;
      this.formationService
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
