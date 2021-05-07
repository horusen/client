import { UrlService } from "./../../../../shared/service/url.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../etablissement.service";
import { TypeEtablissementService } from "../type-etablissement/type-etablissement.service";
import { AuthService } from "src/app/authentification/auth.service";

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
    public auth: AuthService,
    public urlService: UrlService,
    public router: Router,
    public typeEtablissementService: TypeEtablissementService
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.getData(queryParams);
    });
  }

  getData(queryParams: Params) {
    // Echo
    if (this.router.url.match(/school\/echo\/type\/[0-9]+\/etablissement/)) {
      this._subscription[
        "type"
      ] = this.typeEtablissementService.singleData$.subscribe((type) => {
        this.getByType(type.id, queryParams);
      });
    }
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

  // search(keyword: string) {
  //   if (this.router.url.includes("annuaire")) {
  //     this.getEtablissementsInternationalesByType(
  //       this.helper.getQueryParamsFromUrl(this.router.url)[
  //         "type-etablissement"
  //       ],
  //       keyword
  //     );
  //   } else if (this.router.url.includes("hierarchie")) {
  //     this.getEtablissementAffilie(keyword);
  //   }
  // }

  getByType(type: number, queryParams: Params) {
    this.loading = true;
    this.etablissementService.getByType(type, queryParams).subscribe(() => {
      this.loading = false;
    });
  }

  getNonAffilieByType(type: number, keyword: string = "") {
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

  getEtablissementsInternationalesByType(type: number, keyword: string = "") {
    this.type = type;
    this.loading = true;
    this.etablissementService
      .getEtablissementsInternationalesByType(type, keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
