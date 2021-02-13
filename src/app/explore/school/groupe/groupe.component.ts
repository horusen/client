import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { ClasseService } from "../classe/classe.service";

@Component({
  selector: "app-groupe",
  templateUrl: "./groupe.component.html",
  styleUrls: ["./groupe.component.scss"],
})
export class GroupeComponent implements OnInit {
  showData = {
    byClasse: false,
    byProfesseur: false,
    byEtudiant: false,
    byEtablissement: false,
    byGroupeIndependant: false,
  };
  showGroupeCreate: boolean = false;
  constructor(
    public helper: Helper,
    public route: ActivatedRoute,
    public router: Router,
    public classeService: ClasseService // permet d'afficher le titre de la classe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.helper.toggleModal("groupe-show-modal");
      }
    });

    if (this.router.url.includes("classe")) {
      this.showData.byClasse = true;
    } else if (this.router.url.includes("professeur")) {
      this.showData.byProfesseur = true;
    } else if (this.router.url.includes("echo")) {
      this.showData.byEtablissement = true;
    } else if (this.router.url.includes("groupe-independant")) {
      this.showData.byGroupeIndependant = true;
    } else {
      this.showData.byEtudiant = true;
    }
  }

  showGroupeCreateComponent() {
    this.showGroupeCreate = true;
    this.helper.toggleModal("groupe-create-modal");
  }
}
