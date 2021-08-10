import { Component, Input, OnInit } from "@angular/core";
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
  @Input() parent: { name: string; item: any };
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

  getByConsulat(consulat: number, params: Params) {
    this.loading = true;
    this.fonctionService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }
}
