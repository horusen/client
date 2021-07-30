import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { FonctionService } from "../fonction.service";

@Component({
  selector: "app-fonction-list",
  templateUrl: "./fonction-list.component.html",
  styleUrls: ["./fonction-list.component.scss"],
})
export class FonctionListComponent extends BaseComponent implements OnInit {
  constructor(
    public fonctionService: FonctionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fonctionService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (this.router.url.includes("ministere")) {
        this._subscription["ministere"] =
          this.ministereService.singleData$.subscribe((ministere) => {
            this.getByMinistere(ministere.id, params);
          });
      } else if (this.router.url.includes("ambassade")) {
        this._subscription["ambassade"] =
          this.ambassadeService.singleData$.subscribe((ambassade) => {
            this.getByAmbassade(ambassade.id, params);
          });
      }
    });
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.fonctionService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.fonctionService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }
}
