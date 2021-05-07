import { Helper } from "src/app/shared/services/helper";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ServiceEtablissementService } from "./service-etablissement.service";

@Component({
  selector: "app-service-etablissement",
  templateUrl: "./service-etablissement.component.html",
  styleUrls: ["./service-etablissement.component.scss"],
})
export class ServiceEtablissementComponent implements OnInit {
  addService: boolean = false;
  editService: boolean = false;
  searchActive: boolean;
  showDetails = false;
  @ViewChild("search") searchFied: ElementRef;
  constructor(
    public helper: Helper,
    public route: ActivatedRoute,
    public serviceService: ServiceEtablissementService,
    public router: Router
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
      if (fragment === "add-service") {
        this.ajouter();
      } else if (fragment === "edit-service") {
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
    if (router.url.match(/service\//)) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }

  ajouter() {
    this.addService = true;
    this.helper.toggleModal("service-etablissement-create-modal");
  }

  modifier() {
    if (this.serviceService.singleData) {
      this.editService = true;
      this.helper.toggleModal("service-etablissement-edit-modal");
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
