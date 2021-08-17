import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { DomaineInstitutionService } from "../../domaine-institution/domaine-institution.service";
import { MinistereService } from "../../ministere/ministere.service";
import { DomaineService } from "../domaine.service";

@Component({
  selector: "app-domaine-list",
  templateUrl: "./domaine-list.component.html",
  styleUrls: ["./domaine-list.component.scss"],
})
export class DomaineListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  ministere: any;
  ambassade: any;
  constructor(
    public domaineService: DomaineInstitutionService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(domaineService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });
  }

  getData(params: Params): void {
    if (this.parent.name === "ministere") {
      this.getByMinistere(this.parent.item.id, params);
    } else if (this.parent.name === "ambassade") {
      this.getByAmbassade(this.parent.item.id, params);
    } else if (this.parent.name === "consulat") {
      this.getByConsulat(this.parent.item.id, params);
    }
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

  getByConsulat(consulat: number, params: Params) {
    this.loading = true;
    this.domaineService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }
}
