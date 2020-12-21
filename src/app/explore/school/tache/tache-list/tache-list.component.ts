import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { TacheService } from "../tache.service";

@Component({
  selector: "app-tache-list",
  templateUrl: "./tache-list.component.html",
  styleUrls: ["./tache-list.component.scss"],
})
export class TacheListComponent extends BaseComponent implements OnInit {
  @Output() showTacheCreate = new EventEmitter();
  filtre: {} = {};
  constructor(
    public tacheService: TacheService,
    private route: ActivatedRoute
  ) {
    super(tacheService);
  }

  ngOnInit(): void {
    this._subscription["loading"] = this.tacheService.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
    this.route.queryParams.subscribe((params) => {
      Object.keys(params).forEach((key) => {
        this.filtre[key] = params[key].split(",");
      });
      this.getData();
    });
  }

  getData() {
    this.loading = true;
    this.tacheService.initialise().subscribe(() => {
      this.loading = false;
    });
  }

  showTacheCreateComponent() {
    this.showTacheCreate.emit();
    this.helper.toggleModal("tache-create-modal");
  }
}
