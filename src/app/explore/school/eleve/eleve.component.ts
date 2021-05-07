import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
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
  showDetails: boolean = false;
  public parentComponents = {
    eleve: false,
    etablissement: false,
    horsEtablissement: false,
    classe: false,
  };

  addEleve: boolean = false;
  editEleve: boolean = false;
  searchActive: boolean;
  @ViewChild("search") searchFied: ElementRef;

  path = {
    administration_etablissement: /school\/administration\/[0-9]+\/eleve/,
    classe: /classe\/[0-9]+\/eleve/,
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
    this.shouldShowDetails(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowDetails(this.router);
        // this.showDetails = !!this.router.url.match(/classe\//);
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.international = params["international"] == "true";
    });

    this.router.url.includes("eleve")
      ? (this.parentComponents["eleve"] = true)
      : null;

    this.router.url.includes("administration")
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

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment == "add-eleve") {
        this.ajouter();
      }
    });

    this.route.queryParams.subscribe((query) => {
      this.searchActive = !!query.keyword;

      if (query.keyword) {
        if (!this.searchFied.nativeElement.value) {
          this.searchFied.nativeElement.value = query.keyword;
        }
      }
    });
  }

  ajouter() {
    this.addEleve = true;
    this.helper.toggleModal("eleve-add-modal");
  }

  research(keyword: string) {
    if (keyword) {
      this.helper.appendObjectToQueryParams(this.route, { keyword }, [
        "keyword",
      ]);
    }
  }

  annulerRecherche() {
    this.helper.appendObjectToQueryParams(this.route, {}, ["keyword"]);
  }

  shouldShowDetails(router: Router) {
    if (router.url.match(/eleve\//)) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }
}
