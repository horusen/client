import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { ProfesseurService } from "./professeur.service";

@Component({
  selector: "app-professeur",
  templateUrl: "./professeur.component.html",
  styleUrls: ["./professeur.component.scss"],
})
export class ProfesseurComponent implements OnInit {
  addProfesseur: boolean = false;
  editProfesseur: boolean = false;
  searchActive: boolean;
  classeRouteRegex = /classe\/[0-9]+\/professeur/;
  adminRouteRegex = /school\/administration\/info\/[0-9]+\/details\/professeur/;
  showDetails: boolean = false;
  @ViewChild("search") searchFied: ElementRef;

  constructor(
    public router: Router,
    public professeurService: ProfesseurService,
    public helper: Helper,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.shouldShowDetails(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowDetails(this.router);
        // this.showDetails = !!this.router.url.match(/classe\//);
      }
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "create") {
        this.ajouter();
      } else if (fragment === "edit") {
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
    this.addProfesseur = true;
    this.helper.toggleModal("professeur-create-modal");
  }

  modifier() {
    if (this.professeurService.singleData) {
      this.editProfesseur = true;
      this.helper.toggleModal("professeur-edit-modal");
    } else {
      this.router.navigate(["./"], { relativeTo: this.route });
    }
  }

  shouldShowDetails(router: Router) {
    if (router.url.match(/professeur\//)) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
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
