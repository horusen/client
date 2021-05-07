import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ServiceEtablissementService } from "../etablissement/service-etablissement/service-etablissement.service";
import { EtablissementService } from "../etablissement/etablissement.service";
import { Helper } from "src/app/shared/services/helper";
import { EmployeService } from "./employe.service";

@Component({
  selector: "app-employe",
  templateUrl: "./employe.component.html",
  styleUrls: ["./employe.component.scss"],
})
export class EmployeComponent implements OnInit {
  addEmploye: boolean = false;
  editEmploye: boolean = false;
  searchActive: boolean;
  showDetails: boolean;
  @ViewChild("search") searchFied: ElementRef;
  serviceRouteRegex = /administration\/[0-9]+\/service\/[0-9]+\/employe/;

  constructor(
    public router: Router,
    public serviceEtablissementService: ServiceEtablissementService,
    public etablissementService: EtablissementService,
    public helper: Helper,
    public route: ActivatedRoute,
    public employeService: EmployeService
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
      if (fragment === "add-employe") {
        this.ajouter();
      } else if (fragment === "edit-employe") {
        if (this.employeService.singleData) {
          this.modifier();
        } else {
          this.router.navigate(["./"], { relativeTo: this.route });
        }
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
    this.addEmploye = true;
    this.helper.toggleModal("employe-create-modal");
  }

  modifier() {
    this.editEmploye = true;
    this.helper.toggleModal("employe-edit-modal");
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
    if (router.url.match(/structure\//)) {
      {
        this.showDetails = true;
      }
    }
  }
}
