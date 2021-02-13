import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ClasseService } from "../classe/classe.service";
import { EleveService } from "../eleve.service";

@Component({
  selector: "app-eleve",
  templateUrl: "./eleve.component.html",
  styleUrls: ["./eleve.component.scss"],
})
export class EleveComponent extends BaseComponent implements OnInit {
  classe: any;
  international: boolean = false;
  public parentComponents = {
    professeur: false,
    etablissement: false,
    horsEtablissement: false,
    classe: false,
  };

  constructor(
    public eleveService: EleveService,
    public classeService: ClasseService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(eleveService);
  }

  ngOnInit(): void {
    // Object.'professeur's(this.parentComponents).forEach(('professeur') => {
    //   if('professeur' == 'etablissement') {

    //   }
    //   this.router.url.includes('professeur')
    //     ? (this.parentComponents['professeur'] = true)
    //     : null;
    // });

    this.route.queryParams.subscribe((params) => {
      this.international = params["international"] == "true";
    });

    this.router.url.includes("professeur")
      ? (this.parentComponents["professeur"] = true)
      : null;

    this.router.url.includes("echo")
      ? (this.parentComponents["etablissement"] = true)
      : null;

    this.router.url.includes("autres-eleves")
      ? (this.parentComponents["horsEtablissement"] = true)
      : null;

    this.router.url.includes("classe") || this.router.url.includes("annuaire")
      ? (this.parentComponents["classe"] = true)
      : null;

    if (this.parentComponents.classe) {
      this._subscription["classe"] = this.classeService.singleData$.subscribe(
        (classe) => {
          this.classe = classe;
        }
      );
    }
  }
}
