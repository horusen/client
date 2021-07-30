import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistereService } from "../../ministere/ministere.service";
import { ConsulatService } from "../consulat.service";

@Component({
  selector: "app-consulat-list",
  templateUrl: "./consulat-list.component.html",
  styleUrls: ["./consulat-list.component.scss"],
})
export class ConsulatListComponent extends BaseComponent implements OnInit {
  constructor(
    public consulatService: ConsulatService,
    public route: ActivatedRoute,
    public ministereService: MinistereService
  ) {
    super(consulatService);
  }

  ngOnInit(): void {
    this._subscription["ministere"] =
      this.ministereService.singleData$.subscribe((ministere) => {
        this.route.queryParams.subscribe((params) => {
          this.getData(ministere.id, params);
        });
      });
  }

  getData(ministere: number, params: Params): void {
    this.loading = true;
    this.consulatService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }
}
