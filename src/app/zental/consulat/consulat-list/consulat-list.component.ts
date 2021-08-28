import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { MinistereService } from "../../ministere/ministere.service";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-list",
  templateUrl: "./consulat-list.component.html",
  styleUrls: ["./consulat-list.component.scss"],
})
export class ConsulatListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  @Input() colonne_affichage = 4; // Le nombre d'element a afficher sur une ligne
  @Input() itemsPerPage = 8; // le nombre d'element à afficher par page
  navigationUrl: string[];
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(consulatService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });

    this.navigationUrl = this.getNaviagationURL(this.router.url);
  }

  getNaviagationURL(url: string): string[] {
    if (url.split("/").includes("administration"))
      return ["/", "administration", "consulats"];
    else if (url.split("/").includes("toloba")) return ["./"];
    return ["/", "consulats"];
  }

  getData(params: Params): void {
    switch (this.parent.name) {
      case "zental":
        this.getAll(params);
        break;
      case "ministere":
        this.getByMinistere(this.parent.item?.id, params);
        break;
      case "admin":
        this.getByUser(this.auth.user.id_inscription, params);
        break;
      case "ambassade":
        this.getByAmbassade(this.parent.item?.id, params);
        break;
      case "pays":
        this.getByPays(this.parent.item?.id, params);
      default:
        break;
    }
  }

  getByPays(pays: number, params: Params): void {
    this.loading = true;
    this.consulatService.getByPays(pays, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByUser(user: number, params: Params): void {
    this.loading = true;
    this.consulatService.getByUser(user, params).subscribe(() => {
      this.loading = false;
    });
  }

  getAll(params: Params): void {
    this.loading = true;
    this.consulatService.getAll(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params): void {
    this.loading = true;
    this.consulatService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByMinistere(ministere: number, params: Params): void {
    this.loading = true;
    this.consulatService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }
}
