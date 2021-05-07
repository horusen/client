import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { ClasseService } from "../classe/classe.service";

@Component({
  selector: "app-groupe",
  templateUrl: "./groupe.component.html",
  styleUrls: ["./groupe.component.scss"],
})
export class GroupeComponent implements OnInit, AfterViewInit {
  displayBy: string;

  addGroupe: boolean = false;
  editGroupe: boolean = false;
  searchActive: boolean;
  showDetails: boolean = false;
  @ViewChild("search") searchFied: ElementRef;

  showData = {
    byClasse: false,
    byProfesseur: false,
    byEleve: false,
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
    // Check si les statistiques doivent etre affichés
    this.shouldShowDetails(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowDetails(this.router);
      }
    });

    if (this.router.url.includes("classe")) {
      this.displayBy = "classe";
    } else if (this.router.url.includes("school/professeur")) {
      this.displayBy = "professeur";
    } else if (this.router.url.includes("echo")) {
      this.showData.byEtablissement = true;
    } else if (this.router.url.includes("school/groupe-independant")) {
      this.displayBy = "groupesIndependants";
    } else if (this.router.url.includes("school/tache/ancien-groupe")) {
      this.displayBy = "anciensGroupes";
    } else {
      this.displayBy = "eleve";
    }

    this.route.queryParams.subscribe((query) => {
      this.searchActive = query.keyword ? true : false;
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment == "add-groupe") {
        this.ajouter();
      } else if (fragment == "edit-groupe") {
        this.modifier();
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
    this.addGroupe = true;
    this.helper.toggleModal("groupe-create-modal");
  }

  modifier() {
    this.editGroupe = true;
    this.helper.toggleModal("groupe-edit-modal");
  }

  shouldShowDetails(router: Router) {
    if (router.url.match(/groupe\//)) {
      {
        this.showDetails = true;
      }
    }
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
}
