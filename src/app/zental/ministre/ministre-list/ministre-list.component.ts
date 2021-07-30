import { Params } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { MinistereService } from "../../ministere/ministere.service";
import { MinistreService } from "../ministre.service";

@Component({
  selector: "app-ministre-list",
  templateUrl: "./ministre-list.component.html",
  styleUrls: ["./ministre-list.component.scss"],
})
export class MinistreListComponent extends BaseComponent implements OnInit {
  constructor(
    public ministreService: MinistreService,
    public route: ActivatedRoute,
    public router: Router,
    public ministereService: MinistereService
  ) {
    super(ministreService);
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
    this.ministreService
      .getAnciensMinistres(ministere, params)
      .subscribe(() => {
        this.loading = false;
      });
  }

  modifier(ministre: any): void {
    this.ministreService.singleData = ministre;
  }
}
