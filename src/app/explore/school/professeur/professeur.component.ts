import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-professeur",
  templateUrl: "./professeur.component.html",
  styleUrls: ["./professeur.component.scss"],
})
export class ProfesseurComponent implements OnInit {
  showData = {
    byClasse: false,
    byEtablissement: false,
  };
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.url.includes("explore")
      ? (this.showData.byClasse = true)
      : (this.showData.byEtablissement = true);
  }
}
