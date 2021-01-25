import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UrlService } from "src/app/shared/service/url.service";
import { TypeEtablissementService } from "../etablissement/type-etablissement/type-etablissement.service";

@Component({
  selector: "app-employe",
  templateUrl: "./employe.component.html",
  styleUrls: ["./employe.component.scss"],
})
export class EmployeComponent implements OnInit {
  previousUrl: string;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.url.includes("hierarchie")
      ? (this.previousUrl = "/school/etablissement/structure/hiererachie")
      : "/school/etablissement/structure";
  }
}
