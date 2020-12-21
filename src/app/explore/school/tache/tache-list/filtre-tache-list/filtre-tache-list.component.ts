import { LangueService } from "./../../../langue/langue.service";
import { Component, OnInit } from "@angular/core";
import { NiveauService } from "../../../niveau/niveau.service";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AbstractBaseService } from "src/app/shared/services/abstract-base.service";
import { AffectationTacheService } from "../../affectation-tache/affectation-tache.service";

@Component({
  selector: "app-filtre-tache-list",
  templateUrl: "./filtre-tache-list.component.html",
  styleUrls: ["./filtre-tache-list.component.scss"],
})
export class FiltreTacheListComponent extends BaseComponent implements OnInit {
  // Stock les données recuilli grace aux dependances
  public dependancies = {
    niveau: [],
    langue: [],
  };

  // Stock les filtes selectionnés
  // selectedElement = {
  //   langue: [],
  //   niveau: [],
  // };

  // local loading
  localLoading = {
    langue: false,
    niveau: false,
  };

  constructor(
    public abstractBaseService: AbstractBaseService,
    public affectationTacheService: AffectationTacheService,
    public niveauService: NiveauService,
    public langueService: LangueService
  ) {
    super(abstractBaseService);
  }

  ngOnInit(): void {
    this.getNiveau();
    this.getLangue();
  }

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

  getLangue() {
    if (!this.langueService.data.length) {
      this.localLoading.langue = true;
      this._subscription["langue"] = this.langueService
        .get()
        .subscribe((data) => {
          this.dependancies.langue = data;
          this.localLoading.langue = false;
        });
    }
  }

  applyFilter(element: string, element_id?: any) {
    this.affectationTacheService.applyFilter(element, element_id);
  }
}
