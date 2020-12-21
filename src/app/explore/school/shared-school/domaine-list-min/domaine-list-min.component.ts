import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { BaseComponent } from "src/app/shared/components/base-component/base.component";
import { DomaineService } from "../../domaine/domaine.service";

@Component({
  selector: "app-domaine-list-min",
  templateUrl: "./domaine-list-min.component.html",
  styleUrls: ["./domaine-list-min.component.scss"],
})
export class DomaineListMinComponent extends BaseComponent implements OnInit {
  urlHasDomaine: boolean = false;
  constructor(
    public domaineService: DomaineService,
    public route: ActivatedRoute
  ) {
    super(domaineService);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      params["domaine"]
        ? (this.urlHasDomaine = true)
        : (this.urlHasDomaine = false);
    });
    this.getData();
  }

  getData() {
    this.loading = true;
    this.domaineService.get().subscribe(() => {
      this.loading = false;
    });
  }
}
