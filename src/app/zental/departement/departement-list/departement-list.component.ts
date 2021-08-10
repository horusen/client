import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { DepartementService } from "../departement.service";

@Component({
  selector: "app-departement-list",
  templateUrl: "./departement-list.component.html",
  styleUrls: ["./departement-list.component.scss"],
})
export class DepartementListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  constructor(
    public departementService: DepartementService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(departementService);
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
    } else if (this.parent.name === "domaine") {
      this.getByDomaine(this.parent.item.id, params);
    }
  }

  getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.departementService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByDomaine(domaine: number, params: Params): void {
    this.loading = true;
    this.departementService.getByDomaine(domaine, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.departementService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.departementService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }
}
