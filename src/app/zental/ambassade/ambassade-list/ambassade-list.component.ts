import { ParentDefinition } from "./../../../shared/models/parent-definition.model";
import { AmbassadeService } from "./../ambassade.service";
import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-ambassade-list",
  templateUrl: "./ambassade-list.component.html",
  styleUrls: ["./ambassade-list.component.scss"],
})
export class AmbassadeListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  @Input() colonne_affichage = 4; // Le nombre d'element a afficher sur une ligne
  @Input() itemsPerPage = 8; // le nombre d'element à afficher par page
  navigationUrl: string[];
  constructor(
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(ambassadeService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });

    this.navigationUrl = this.getNaviagationURL(this.router.url);
  }

  getNaviagationURL(url: string): string[] {
    if (url.split("/").includes("administration"))
      return ["/", "administration", "ambassades"];
    else if (url.split("/").includes("toloba")) return ["./"];
    return ["/", "ambassades"];
  }

  getData(params: Params): void {
    if (this.parent.name === "zental") {
      this.getAll(params);
    } else if (this.parent.name === "ministere") {
      this.getByMinistere(this.parent.item.id, params);
    } else if (this.parent.name === "admin") {
      this.getByUser(this.auth.user.id_inscription, params);
    } else if (this.parent.name === "pays") {
      this.getByPays(this.parent.item.id, params);
    }
  }

  getAll(params: Params): void {
    this.loading = true;
    this.ambassadeService.getAll(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByMinistere(ministere: number, params: Params): void {
    this.loading = true;
    this.ambassadeService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByUser(user: any, params: Params) {
    this.loading = true;
    this.ambassadeService.getByUser(user, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByPays(pays: number, params: Params): void {
    this.loading = true;
    this.ambassadeService.getByPays(pays, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }
}
