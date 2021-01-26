import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { EtablissementService } from "../etablissement.service";
import { TypeEtablissementService } from "../type-etablissement/type-etablissement.service";

@Component({
  selector: "app-etablissement-list-container",
  templateUrl: "./etablissement-list-container.component.html",
  styleUrls: ["./etablissement-list-container.component.scss"],
})
export class EtablissementListContainerComponent
  extends BaseComponent
  implements OnInit {
  showHeader: boolean = true;
  typeEtablissement: any;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public etablissementService: EtablissementService,
    public typeEtablissementService: TypeEtablissementService
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.showHeader = !(params["international"] == "true");
    });

    if (this.router.url.includes("school/etablissement/type")) {
      this._subscription[
        "type_etablissement"
      ] = this.typeEtablissementService.singleData$.subscribe((item) => {
        this.typeEtablissement = item;
      });
    }

    console.log(this.router.url);
  }

  research(keyword: string) {
    this.getEtablissementAffilieByType(
      this.helper.getQueryParamsFromUrl(this.router.url)["type-etablissement"],
      keyword
    );
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
    this.etablissementService.loading = true;
    this.etablissementService
      .getEtablissementsAffiliesByType(type, keyword)
      .subscribe(() => {
        this.etablissementService.loading = false;
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
    this.loading = true;
    this.etablissementService
      .getEtablissementsInternationalesByType(type, keyword)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
