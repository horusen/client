import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { PosteService } from "../poste.service";

@Component({
  selector: "app-poste-list",
  templateUrl: "./poste-list.component.html",
  styleUrls: ["./poste-list.component.scss"],
})
export class PosteListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  constructor(
    public posteService: PosteService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(posteService);
  }

  ngOnInit(): void {
    if (this.router.url.includes("ministere")) {
      this._subscription["ministere"] =
        this.ministereService.singleData$.subscribe((ministere) => {
          this.route.queryParams.subscribe((params) => {
            this.getByMinistere(ministere.id, params);
          });
        });
    } else if (this.router.url.includes("ambassade")) {
      this._subscription["ambassade"] =
        this.ambassadeService.singleData$.subscribe((ambassade) => {
          this.route.queryParams.subscribe((params) => {
            this.getByAmbassade(ambassade.id, params);
          });
        });
    }
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
    this.posteService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByConsulat(consulat: number, params: Params) {
    this.loading = true;
    this.posteService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.posteService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }

  modifier(poste: any) {
    this.posteService.singleData = poste;
  }
}
