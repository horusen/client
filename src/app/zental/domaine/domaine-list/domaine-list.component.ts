import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { DomaineService } from "../domaine.service";

@Component({
  selector: "app-domaine-list",
  templateUrl: "./domaine-list.component.html",
  styleUrls: ["./domaine-list.component.scss"],
})
export class DomaineListComponent extends BaseComponent implements OnInit {
  ministere: any;
  ambassade: any;
  constructor(
    public domaineService: DomaineService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(domaineService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (this.router.url.includes("ministere")) {
        this._subscription["ministere"] =
          this.ministereService.singleData$.subscribe((ministere) => {
            this.ministere = ministere;
            this.getByMinistere(ministere.id, params);
          });
        console.log("ministere");
      } else if (this.router.url.includes("ambassade")) {
        this._subscription["ambassade"] =
          this.ambassadeService.singleData$.subscribe((ambassade) => {
            this.ambassade = ambassade;
            this.getByAmbassade(ambassade.id, params);
          });
      }
    });
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.domaineService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.domaineService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }
}
