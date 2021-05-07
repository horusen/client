import { Params } from "@angular/router";
import { BaseComponent } from "./../../../../shared/components/base-component/base.component";
import { Component, OnInit } from "@angular/core";
import { EtablissementService } from "../etablissement.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-etablissement-affilies",
  templateUrl: "./etablissement-affilies.component.html",
  styleUrls: ["./etablissement-affilies.component.scss"],
})
export class EtablissementAffiliesComponent
  extends BaseComponent
  implements OnInit {
  constructor(
    public etablissementService: EtablissementService,
    public route: ActivatedRoute
  ) {
    super(etablissementService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.getData(queryParams);
    });
  }

  getData(params: Params) {
    this._subscription[
      "etablissement"
    ] = this.etablissementService.singleData$.subscribe((etablissement) => {
      this.getEtablissementAffilie(etablissement.id, params);
    });
  }

  getEtablissementAffilie(etablissement: number, params: Params) {
    this.loading = true;
    this.etablissementService
      .getEtablissementsAffilies(etablissement, params)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
