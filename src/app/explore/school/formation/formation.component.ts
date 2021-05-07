import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { FormationService } from "./formation.service";

@Component({
  selector: "app-formation",
  templateUrl: "./formation.component.html",
  styleUrls: ["./formation.component.scss"],
})
export class FormationComponent implements OnInit {
  addFormation = false;
  editFormation = false;
  showDetails: boolean = false;
  adminEtablissementUrlRegex = /school\/administration\/[0-9]+\/formation/;
  etablissementUrlRegex = /school\/echo\/type\/[0-9]+\/etablissement\/[0-9]+\/formation/;
  programmeUrlRegex = /school\/administration\/[0-9]+\/programme\/[0-9]+/;
  searchActive: boolean;
  @ViewChild("search") searchFied: ElementRef;
  constructor(
    public helper: Helper,
    public router: Router,
    public route: ActivatedRoute,
    public formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.shouldShowDetails(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowDetails(this.router);
        this.showDetails = !!this.router.url.match(/formation\//);
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

  shouldShowDetails(router: Router) {
    if (router.url.match(/formation\//)) {
      {
        this.showDetails = true;
      }
    }
  }

  ajouter() {
    this.addFormation = true;
    this.helper.toggleModal("formation-create-modal");
  }

  modifier() {
    if (this.formationService.singleData) {
      this.editFormation = true;
      this.helper.toggleModal("formation-edit-modal");
    } else {
      this.router.navigate(["./"], { relativeTo: this.route });
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
