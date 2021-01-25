import { Component, OnInit } from "@angular/core";
import { Helper } from "src/app/shared/services/helper";
import { EtablissementService } from "../etablissement.service";

@Component({
  selector: "app-hierarchie-etablissement",
  templateUrl: "./hierarchie-etablissement.component.html",
  styleUrls: ["./hierarchie-etablissement.component.scss"],
})
export class HierarchieEtablissementComponent implements OnInit {
  addAffiliation: boolean = false;
  constructor(
    public helper: Helper,
    public etablissementService: EtablissementService
  ) {}

  ngOnInit(): void {}

  add() {
    this.addAffiliation = true;
    this.helper.toggleModal("affiliation-add-modal");
  }

  getEtablissementAffilie(keyword: string = "") {
    this.etablissementService.loading = true;
    this.etablissementService
      .getEtablissementsAffilies(keyword)
      .subscribe(() => {
        this.etablissementService.loading = false;
      });
  }
}
