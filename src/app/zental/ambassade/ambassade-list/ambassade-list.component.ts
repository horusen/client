import { AmbassadeService } from "./../ambassade.service";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { ActivatedRoute, Params } from "@angular/router";
import { MinistereService } from "../../ministere/ministere.service";

@Component({
  selector: "app-ambassade-list",
  templateUrl: "./ambassade-list.component.html",
  styleUrls: ["./ambassade-list.component.scss"],
})
export class AmbassadeListComponent extends BaseComponent implements OnInit {
  constructor(
    public ambassadeService: AmbassadeService,
    public route: ActivatedRoute,
    public ministereService: MinistereService
  ) {
    super(ambassadeService);
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
    this.ambassadeService.getByMinistere(ministere, params).subscribe(() => {
      this.loading = false;
    });
  }
}
