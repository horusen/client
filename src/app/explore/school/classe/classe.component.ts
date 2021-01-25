import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";

declare const $;

@Component({
  selector: "app-classe",
  templateUrl: "./classe.component.html",
  styleUrls: ["./classe.component.scss"],
})
export class ClasseComponent implements OnInit {
  addClasse: boolean = false;
  showClasse: boolean = false;
  public parentComponents = {
    professeur: false,
    etablissement: false
  };
  constructor(
    public router: Router,
    public helper: Helper,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   
  }

  ajouterClasse() {
    this.showClasse = true;
    this.helper.toggleModal("classe-show-modal");
  }
}
