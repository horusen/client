import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { ParentEleveService } from "./parent-eleve.service";

@Component({
  selector: "app-parent-eleve",
  templateUrl: "./parent-eleve.component.html",
  styleUrls: ["./parent-eleve.component.scss"],
})
export class ParentEleveComponent implements OnInit {
  addParent = false;
  editParent = false;
  searchActive: boolean;
  showDetails: boolean = false;
  @ViewChild("search") searchFied: ElementRef;

  constructor(
    public helper: Helper,
    public router: Router,
    public route: ActivatedRoute,
    public parentService: ParentEleveService
  ) {}

  ngOnInit(): void {
    // Check si les statistiques doivent etre affichés
    this.shouldShowDetails(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowDetails(this.router);
      }
    });
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === "add-parent") {
        this.ajouter();
      } else if (fragment === "edit-parent") {
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
    if (router.url.match(/parents-eleves\//)) {
      {
        this.showDetails = true;
      }
    }
  }

  ajouter() {
    this.addParent = true;
    this.helper.toggleModal("parent-add-modal");
  }

  modifier() {
    if (this.parentService.singleData) {
      this.editParent = true;
      this.helper.toggleModal("parent-edit-modal");
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
