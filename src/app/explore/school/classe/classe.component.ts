import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { ClasseService } from "./classe.service";

declare const $;

@Component({
  selector: "app-classe",
  templateUrl: "./classe.component.html",
  styleUrls: ["./classe.component.scss"],
})
export class ClasseComponent implements OnInit, AfterViewInit {
  addClasse: boolean = false;
  editClasse: boolean = false;
  showClasse: boolean = false;
  showDetails: boolean = false;
  searchActive: boolean;
  @ViewChild("search") searchFied: ElementRef;

  constructor(
    public router: Router,
    public helper: Helper,
    public route: ActivatedRoute,
    public classeService: ClasseService
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

  shouldShowDetails(router: Router) {
    if (router.url.match(/classe\//)) {
      this.showDetails = true;
    } else {
      this.showDetails = false;
    }
  }

  ajouter() {
    this.addClasse = true;
    this.helper.toggleModal("classe-add-modal");
  }

  modifier() {
    if (this.classeService.singleData) {
      this.editClasse = true;
      this.helper.toggleModal("classe-edit-modal");
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
