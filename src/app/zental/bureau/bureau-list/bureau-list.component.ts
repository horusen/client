import { ParentDefinition } from "src/app/shared/models/parent-definition.model";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { BureauService } from "../bureau.service";

@Component({
  selector: "app-bureau-list",
  templateUrl: "./bureau-list.component.html",
  styleUrls: ["./bureau-list.component.scss"],
})
export class BureauListComponent extends BaseComponent implements OnInit {
  @Input() parent: ParentDefinition;
  urlNavigation: String[];
  constructor(
    public bureauService: BureauService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(bureauService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getData(params);
    });

    this.urlNavigation = this.getNaviagationURL(this.router.url);
  }

  getData(params: Params): void {
    if (this.parent.name === "zental") {
      this.getAll(params);
    } else if (this.parent.name === "ministere") {
      this.getByMinistere(this.parent.item.id, params);
    } else if (this.parent.name === "ambassade") {
      this.getByAmbassade(this.parent.item.id, params);
    } else if (this.parent.name === "consulat") {
      this.getByConsulat(this.parent.item.id, params);
    } else if (this.parent.name === "admin") {
      this.getByUser(this.auth.user.id_inscription, params);
    }
  }

  getNaviagationURL(url: string): string[] {
    if (url.split("/").includes("administration"))
      return ["/", "administration", "bureaux"];
    return ["/", "bureaux"];
  }

  getAll(params: Params): void {
    this.loading = true;
    this.bureauService.getAll(true, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByUser(user: number, params: Params): void {
    this.loading = true;
    this.bureauService.getByUser(user, params).subscribe({
      complete: () => {
        this.loading = false;
      },
    });
  }

  getByMinistere(ministere: number, params: Params) {
    this.loading = true;
    this.bureauService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.bureauService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByConsulat(consulat: number, params: Params): void {
    this.loading = true;
    this.bureauService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }
}
