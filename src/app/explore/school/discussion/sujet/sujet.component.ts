import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Helper } from "src/app/shared/services/helper";
import { GroupeService } from "../../groupe/groupe.service";
import { SousDomaineService } from "../../sous-domaine/sous-domaine.service";
import { SujetService } from "./sujet.service";

@Component({
  selector: "app-sujet",
  templateUrl: "./sujet.component.html",
  styleUrls: ["./sujet.component.scss"],
})
export class SujetComponent implements OnInit {
  @ViewChild("search", { static: false }) search: ElementRef;
  type: string;
  keyword: string = "";
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public groupeService: GroupeService,
    public sousDomaineService: SousDomaineService,
    public sujetService: SujetService,
    public helper: Helper
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams["type_discussion"]) {
        this.type = queryParams["type_discussion"];
      }

      if (queryParams["keyword"]) {
        this.keyword = queryParams["keyword"];
      } else {
        this.keyword = "";
      }
    });
  }

  ngAfterViewInit(): void {
    this.search.nativeElement.value = this.keyword;
  }

  research(keyword: string) {
    const currentQueryParams = this.helper.getQueryParamsFromUrl(
      this.router.url
    );
    const currentQueryParamsWithoutKeyword = this.helper.omitFieldInObject(
      currentQueryParams,
      ["keyword"]
    );
    if (keyword) {
      this.router.navigate(["./"], {
        queryParams: { ...currentQueryParamsWithoutKeyword, keyword: keyword },
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(["./"], {
        queryParams: { ...currentQueryParamsWithoutKeyword },
        relativeTo: this.route,
      });
    }
  }
}
