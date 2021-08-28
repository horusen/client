import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { AmbassadeService } from "../../ambassade/ambassade.service";
import { MinistereService } from "../../ministere/ministere.service";
import { LiaisonService } from "../liaison.service";

@Component({
  selector: "app-liaison-list",
  templateUrl: "./liaison-list.component.html",
  styleUrls: ["./liaison-list.component.scss"],
})
export class LiaisonListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  @Input() colonne_affichage = 4;
  @Input() itemsPerPage = 8;
  navigationUrl: string[];
  constructor(
    public liaisonService: LiaisonService,
    public ministereService: MinistereService,
    public ambassadeService: AmbassadeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(liaisonService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });

    this.navigationUrl = this.getNaviagationURL(this.router.url);
  }

  getNaviagationURL(url: string): string[] {
    if (url.split("/").includes("toloba")) return ["./", "bureaux"];
    return ["./"];
  }

  getData(params: Params): void {
    switch (this.parent.name) {
      case "zental":
        this.getAll(params);
        break;
      case "ministere":
        this.getByMinistere(this.parent.item?.id, params);
        break;
      case "ambassade":
        this.getByAmbassade(this.parent.item?.id, params);
        break;
      case "consulat":
        this.getByConsulat(this.parent.item?.id, params);
        break;
      case "diplomatie":
        this.getByDiplomatie(this.parent.item?.id, params);
        break;

      default:
        break;
    }
  }

  getAll(params: Params): void {
    this.loading = true;
    this.liaisonService.getAll(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.liaisonService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.liaisonService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.liaisonService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByDiplomatie(pays: number, params: Params): void {
    this.loading = true;
    this.liaisonService.getByDiplomatie(pays, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }
}
