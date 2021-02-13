import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProfesseurListComponent } from "./professeur-list/professeur-list.component";
import { ProfesseurService } from "./professeur.service";

@Component({
  selector: "app-professeur",
  templateUrl: "./professeur.component.html",
  styleUrls: ["./professeur.component.scss"],
})
export class ProfesseurComponent
  extends ProfesseurListComponent
  implements OnInit {
  showData = {
    byClasse: false,
    byEtablissement: false,
    horsEtablissement: false,
    international: false,
  };
  constructor(
    public router: Router,
    public professeurService: ProfesseurService
  ) {
    super(professeurService);
  }

  ngOnInit(): void {
    // this.router.url.includes("explore")
    //   ? (this.showData.byClasse = true)
    //   : null;
    // this.router.url.includes("international=true")
    //   ? (this.showData.international = true)
    //   : null;
    // this.router.url.includes("professeur") &&
    // !this.router.url.includes("international=true") &&
    // !this.router.url.includes("autres-professeurs")
    //   ? (this.showData.byEtablissement = true)
    //   : null;
    // this.router.url.includes("autres-professeurs")
    //   ? (this.showData.horsEtablissement = true)
    //   : null;
  }

  research(keyword: string) {
    if (this.router.url.includes("school/explore")) {
      this.getByUserClasse(keyword);
    } else if (this.router.url.includes("school/professeur")) {
      this.getAutresDeMemeEtablissement(keyword);
    } else if (this.router.url.includes("school/echo/hierarchie-interne")) {
      this.getByEtablissement(this.etablissementService.etablissement.id);
    } else if (this.router.url.includes("school/echo/hierarchie-externe")) {
      this.getHorsEtablissementMemePays(
        this.etablissementService.etablissement.id
      );
    } else if (this.router.url.includes("school/echo/annuaire")) {
      this.getAll(keyword);
    } else if (this.router.url.includes("school/echo/administration")) {
      this.etablissementService.singleData$.subscribe((etablissement) => {
        console.log("etablissement");
        this.getByEtablissement(etablissement.id);
      });
    }
  }
}
