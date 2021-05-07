import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "../tache.service";

@Component({
  selector: "app-tache-list",
  templateUrl: "./tache-list.component.html",
  styleUrls: ["./tache-list.component.scss"],
})
export class TacheListComponent extends BaseComponent implements OnInit {
  filtre: {} = {};
  constructor(
    public tacheService: TacheService,
    private route: ActivatedRoute
  ) {
    super(tacheService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.getData(queryParams);
    });
  }

  getData(params: Params) {
    this.loading = true;
    this.tacheService.initialise(true, params).subscribe(() => {
      this.loading = false;
    });
  }
}
