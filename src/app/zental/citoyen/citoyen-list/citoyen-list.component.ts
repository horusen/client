import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { Component, Input, OnInit } from "@angular/core";
import { CitoyenService } from "../citoyen.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-citoyen-list",
  templateUrl: "./citoyen-list.component.html",
  styleUrls: ["./citoyen-list.component.scss"],
})
export class CitoyenListComponent extends BaseComponent implements OnInit {
  @Input() parent: { name: string; item: any };
  constructor(
    public citoyenService: CitoyenService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(citoyenService);
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.getData(params);
      },
    });
  }

  getData(params: Params): void {
    if (this.parent.name === "liaison") {
      this.getByLiaison(this.parent.item.id, params);
    } else if (this.parent.name === "ambassade") {
      this.getByAmbassade(this.parent.item.id, params);
    } else if (this.parent.name === "consulat") {
      this.getByConsulat(this.parent.item.id, params);
    }
  }

  getByLiaison(liaison: number, params: Params) {
    this.loading = true;
    this.citoyenService.getByLiaison(liaison, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByConsulat(consulat: number, params: Params) {
    this.loading = true;
    this.citoyenService.getByConsulat(consulat, params).subscribe(() => {
      this.loading = false;
    });
  }

  getByAmbassade(ambassade: number, params: Params) {
    this.loading = true;
    this.citoyenService.getByAmbassade(ambassade, params).subscribe(() => {
      this.loading = false;
    });
  }
}
