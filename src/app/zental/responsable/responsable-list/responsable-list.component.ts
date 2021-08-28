import { ActivatedRoute, Params } from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ResponsableService } from "../responsable.service";

@Component({
  selector: "app-responsable-list",
  templateUrl: "./responsable-list.component.html",
  styleUrls: ["./responsable-list.component.scss"],
})
export class ResponsableListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; entiteDiplomatique: any };
  constructor(
    public responsableService: ResponsableService,
    public route: ActivatedRoute
  ) {
    super(responsableService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => this.getData(params));
  }

  getData(params: Params): void {
    if (this.parent.name === "ministre") {
      this.getByAnciensMinistres(this.parent.entiteDiplomatique.id, params);
    } else if (this.parent.name === "ambassadeur") {
      this.getByAnciensAmbassadeurs(this.parent.entiteDiplomatique.id, params);
    } else if (this.parent.name === "consul") {
      this.getByAnciensConsules(this.parent.entiteDiplomatique.id, params);
    }
  }

  getByAnciensMinistres(ministere: number, params: Params): void {
    this.loading = true;
    this.responsableService
      .getByAnciensMinistres(ministere, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByAnciensAmbassadeurs(ambassade: number, params: Params): void {
    this.loading = true;
    this.responsableService
      .getByAnciensAmbassadeurs(ambassade, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  getByAnciensConsules(consulat: number, params: Params): void {
    this.loading = true;
    this.responsableService
      .getByAnciensConsules(consulat, params)
      .subscribe(() => {
        this.loading = false;
      });
  }
}
