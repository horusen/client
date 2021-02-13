import { UrlService } from "./../../../../shared/service/url.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../etablissement.service";
import { TypeEtablissementService } from "../type-etablissement/type-etablissement.service";

@Component({
  selector: "app-etablissement-list",
  templateUrl: "./etablissement-list.component.html",
  styleUrls: ["./etablissement-list.component.scss"],
})
export class EtablissementListComponent
  extends BaseComponent
  implements OnInit {
  type: number;
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute,
    public urlService: UrlService,
    public router: Router,
    public typeEtablissementService: TypeEtablissementService
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    if (this.router.url.includes("school/echo/type")) {
      this._subscription[
        "type"
      ] = this.typeEtablissementService.singleData$.subscribe((type) => {
        this.getAffiliatedToUserByType(type.id);
      });
    }
    // this._subscription[
    //   "loading"
    // ] = this.etablissementService.loading$.subscribe((loading) => {
    //   this.loading = loading;
    // });

    // this.route.queryParams.subscribe((params) => {
    //   if (Object.keys(params).length) {
    //     if (params["affilie"] == "true") {
    //       params["type-etablissement"]
    //         ? this.getEtablissementAffilieByType(params["type-etablissement"])
    //         : this.getEtablissementAffilie();
    //     } else {
    //       if (params["international"] && params["international"] == "true") {
    //         params["type-etablissement"]
    //           ? this.getEtablissementsInternationalesByType(
    //               params["type-etablissement"]
    //             )
    //           : null;
    //       } else {
    //         params["type-etablissement"]
    //           ? this.getByType(params["type-etablissement"])
    //           : null;
    //       }
    //     }
    //   } else {
    //     this.get();
    //   }
    // });
  }

  getAffiliatedToUserByType(type: number) {
    this.loading = true;
    this.etablissementService.getAffiliatedToUserByType(type).subscribe(() => {
      this.loading = false;
    });
  }

  get() {
    this.loading = true;
    this.etablissementService.initialise().subscribe(() => {
      this.loading = false;
    });
  }

  savePreviousUrl() {
    this.urlService.previousUrl = this.router.url;
  }

  search(keyword: string) {
    if (this.router.url.includes("annuaire")) {
      this.getEtablissementsInternationalesByType(
        this.helper.getQueryParamsFromUrl(this.router.url)[
          "type-etablissement"
        ],
        keyword
      );
    } else if (this.router.url.includes("hierarchie")) {
      this.getEtablissementAffilie(keyword);
    }
  }

  getByType(type: number, keyword: string = "") {
    this.loading = true;
    this.etablissementService
      .getEtablissementsNonAffiliesByType(type)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getEtablissementAffilieByType(type: number, keyword: string = "") {
    this.loading = true;
    this.etablissementService
      .getEtablissementsAffiliesByType(type)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getEtablissementAffilie(keyword: string = "") {
    this.loading = true;
    this.etablissementService
      .getEtablissementsAffilies(keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getEtablissementsInternationalesByType(type: number, keyword: string = "") {
    console.log(keyword);
    this.type = type;
    this.loading = true;
    this.etablissementService
      .getEtablissementsInternationalesByType(type, keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
