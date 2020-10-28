import { PeriodeService } from "./../../../periode/periode.service";
import { Component, OnInit } from "@angular/core";
import { NiveauService } from "../../../niveau/niveau.service";
import { TacheService } from "../../tache.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AbstractBaseService } from "src/app/shared/services/abstract-base.service";

@Component({
  selector: "app-filtre-tache-list",
  templateUrl: "./filtre-tache-list.component.html",
  styleUrls: ["./filtre-tache-list.component.scss"],
})
export class FiltreTacheListComponent extends BaseComponent implements OnInit {
  // Stock les données recuilli grace aux dependances
  public dependancies = {
    niveau: [],
    periode: [],
  };

  // Stock les filtes selectionnés
  // selectedElement = {
  //   periode: [],
  //   niveau: [],
  // };

  // local loading
  localLoading = {
    periode: false,
    niveau: false,
  };

  constructor(
    public abstractBaseService: AbstractBaseService,
    public tacheService: TacheService,
    public niveauService: NiveauService,
    public periodeService: PeriodeService
  ) {
    super(abstractBaseService);
  }

  ngOnInit(): void {}

  getNiveau() {
    if (!this.niveauService.data.length) {
      this.localLoading.niveau = true;
      this._subscription["niveau"] = this.niveauService
        .get()
        .subscribe((data) => {
          this.dependancies.niveau = data;
          this.localLoading.niveau = false;
        });
    }
  }

  getPeriode() {
    if (!this.periodeService.data.length) {
      this.localLoading.periode = true;
      this._subscription["periode"] = this.periodeService
        .get()
        .subscribe((data) => {
          this.dependancies.periode = data;
          this.localLoading.periode = false;
        });
    }
  }

  applyFilter(element: string, element_id?: any) {
    if (element_id == "null") {
      if (this.tacheService.getFiltre(element).length)
        this.tacheService.setFiltre(element, []);
      return;
    }
    this.tacheService.setFiltre(element, [element_id]);
  }
}
