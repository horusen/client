import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { ProgrammeService } from "../programme.service";

@Component({
  selector: "app-programme",
  templateUrl: "./programme.component.html",
  styleUrls: ["./programme.component.scss"],
})
export class ProgrammeComponent implements OnInit, AfterViewInit {
  addProgramme = false;
  showDetails: boolean = false;
  editProgramme = false;
  showProgramme: boolean; // Check whether or not we are on the show component
  searchActive: boolean; // Check whether or not search is active
  @ViewChild("search") searchFied: ElementRef;

  constructor(
    public helper: Helper,
    public router: Router,
    public route: ActivatedRoute,
    public programmeService: ProgrammeService
  ) {}

  ngOnInit(): void {
    this.showProgramme = !!this.router.url.match(/programme\/[0-9]+/);

    this.shouldShowDetails(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowDetails(this.router);
        this.showProgramme = !!this.router.url.match(/programme\/[0-9]+/);
      }
    });
  }

  shouldShowDetails(router: Router) {
    if (router.url.match(/programme\//)) {
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
    this.addProgramme = true;
    this.helper.toggleModal("programme-create-modal");
  }

  modifier() {
    if (this.programmeService.singleData) {
      this.editProgramme = true;
      this.helper.toggleModal("programme-edit-modal");
    } else {
      this.router.navigate(["./"], { relativeTo: this.route });
    }
  }

  deleteUrlQueryParams() {
    this.router.navigate(["./"], { relativeTo: this.route });
  }
}
